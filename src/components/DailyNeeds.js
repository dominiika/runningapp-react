import React, { Component } from 'react';

class DailyNeeds extends Component {
  state = {
    age: 0,
    height: 0,
    weight: 0,
    gender: '',
    trainingsPerWeek: 0,
    dailyNeeds: 0,
    ageErr: '',
    heightErr: '',
    weightErr: '',
    genderErr: '',
    trainingsPerWeekErr: '',
    errMsg: null,
  };

  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  calculateDailyCaloricNeeds = () => {
    let keys = Object.keys(this.state).slice(0, 5);
    this.validate(keys);
    console.log('Calculating needs...');
  };

  validate = (inputs) => {
    inputs.map((input) => {
      if (this.state[input] === '' || this.state[input] === 0) {
        console.log(`${input} is null`);
        this.setState({ [`${input}Err`]: 'This field may not be empty or 0.' });
      }
    });
  };

  fetchDailyCaloricNeeds = () => {
    let resStatus = 0;
    fetch(`http://127.0.0.1:5000/daily-calories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.props.cookies.get('token')}`,
      },
      body: JSON.stringify({
        age: this.state.age,
        height: this.state.height,
        weight: this.state.weight,
        gender: this.state.gender,
        trainings_per_week: this.state.trainingsPerWeek,
      }),
    })
      .then((res) => {
        resStatus = res.status;
        console.log(res.status);
        return res.json();
      })
      .then((res) => {
        console.log(res);

        if (resStatus === 201) {
          this.setState({ errMsg: null });
          // document.getElementById('daily-needs').M_Modal.close();
          // this.clearInputs();
        } else {
          if (res.msg) {
            this.setState({ errMsg: res.msg });
          } else if (res.message) {
            this.setState({ errMsg: res.message });
          }
        }
      })
      .catch((err) => console.log(err));
  };

  render() {
    console.log(this.state);
    return (
      <React.Fragment>
        <div id="daily-needs" className="modal">
          <div className="modal-content">
            <h4>Calculate your daily caloric needs</h4>
            <form>
              <div className="input-field">
                <input
                  className="text"
                  name="age"
                  onChange={this.handleInputChange}
                  type="number"
                />
                <label htmlFor="age">Age</label>
                <span className="err-msg text">{this.state.ageErr}</span>
              </div>
              <div className="input-field">
                <input
                  className="text"
                  name="height"
                  onChange={this.handleInputChange}
                  type="number"
                />
                <label htmlFor="height">Height</label>
                <span className="err-msg text">{this.state.heightErr}</span>
              </div>
              <div className="input-field">
                <input
                  className="text"
                  name="weight"
                  onChange={this.handleInputChange}
                  type="number"
                />
                <label htmlFor="weight">Weight</label>
                <span className="err-msg text">{this.state.weightErr}</span>
              </div>
              <div className="input-field">
                <input
                  className="text"
                  name="gender"
                  onChange={this.handleInputChange}
                  type="text"
                />
                <label htmlFor="gender">Gender</label>
                <span className="err-msg text">{this.state.genderErr}</span>
              </div>
              <div className="input-field">
                <input
                  className="text"
                  name="trainingsPerWeek"
                  onChange={this.handleInputChange}
                  type="number"
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
            <button
              onClick={this.calculateDailyCaloricNeeds}
              className="btn cyan accent-3 waves-effect waves-dark black-text"
            >
              Calculate
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default DailyNeeds;
