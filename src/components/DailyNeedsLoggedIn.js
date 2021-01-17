import React, { Component } from 'react';

const REQUIRED_ERR = 'This field is required';

// https://programmingwithmosh.com/react/create-react-loading-spinner/

class DailyNeedsLoggedIn extends Component {
  state = {
    trainingsPerWeek: 0,
    dailyNeeds: 0,
    trainingsPerWeekErr: '',
    saveButton: false,
    msg: '',
    isError: false,
  };

  // add styling to msg

  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });

    let name = event.target.name;
    let input = document.getElementById(`daily-needs-logged-in-${name}`);
    input.className = 'text';
    this.setState({
      [name]: event.target.value,
      [`${name}Err`]: null,
      saveButton: false,
      msg: '',
      isError: false,
    });
  };

  calculateDailyCaloricNeeds = () => {
    this.validate();
    if (this.state.trainingsPerWeek !== '') {
      this.fetchDailyCaloricNeeds();
    } else {
      this.setState({ dailyNeeds: 0 });
    }
  };

  validate = () => {
    if (this.state.trainingsPerWeek === '') {
      this.setState({ trainingsPerWeekErr: REQUIRED_ERR });
      let input = document.getElementById(
        `daily-needs-logged-in-trainingsPerWeek`
      );
      input.classList.add('invalid');
    }
  };

  fetchDailyCaloricNeeds = () => {
    fetch(`http://127.0.0.1:5000/daily-calories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        age: this.props.userProfile.age,
        height: this.props.userProfile.height,
        weight: this.props.userProfile.weight,
        gender: this.props.userProfile.gender,
        trainings_per_week: this.state.trainingsPerWeek,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        this.setState({
          dailyNeeds: res.daily_caloric_needs,
          saveButton: true,
        });
      })
      .catch((err) => console.log(err));
  };

  saveDailyNeeds = () => {
    let resStatus = 0;
    fetch('http://127.0.0.1:5000/update-daily-needs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.props.cookies.get('token')}`,
      },
      body: JSON.stringify({
        daily_cal: this.state.dailyNeeds,
      }),
    })
      .then((res) => {
        resStatus = res.status;
        return res.json();
      })
      .then((res) => {
        if (resStatus === 201) {
          this.setState({
            msg: res.message,
            isError: false,
          });
          this.props.onLoadUserProfile(this.props.userProfile, res.daily_cal);
        } else {
          this.setState({
            msg: res.message,
            isError: true,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <React.Fragment>
        <div id="daily-needs-logged-in" className="modal">
          <div className="modal-content">
            <h4>Calculate your daily caloric needs</h4>
            <form>
              <div className="input-field">
                <input
                  id="daily-needs-logged-in-trainingsPerWeek"
                  className="text"
                  name="trainingsPerWeek"
                  onChange={this.handleInputChange}
                  type="number"
                  value={this.state.trainingsPerWeek}
                />
                <label htmlFor="trainingsPerWeek">Trainings per week</label>
                <span className="err-msg text">
                  {this.state.trainingsPerWeekErr}
                </span>
              </div>
            </form>
            <span className="text-center">
              Your daily caloric needs: <strong>{this.state.dailyNeeds}</strong>
              <br />
              {this.state.msg}
            </span>
          </div>
          <div className="modal-footer">
            {!this.state.saveButton ? (
              <button
                onClick={this.calculateDailyCaloricNeeds}
                className="btn cyan accent-3 waves-effect waves-dark black-text"
              >
                Calculate
              </button>
            ) : (
              <button
                onClick={this.saveDailyNeeds}
                className="btn cyan accent-3 waves-effect waves-dark black-text"
              >
                Save
              </button>
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default DailyNeedsLoggedIn;
