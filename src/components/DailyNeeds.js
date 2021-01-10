import React, { Component } from 'react';

const REQUIRED_ERR = 'This field is required';
const KEYS = ['age', 'height', 'weight', 'gender', 'trainingsPerWeek'];

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
  };

  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });

    let name = event.target.name;
    let input = document.getElementById(`daily-needs-${name}`);
    input.className = 'text';
    this.setState({
      [name]: event.target.value,
      [`${name}Err`]: null,
    });
  };

  calculateDailyCaloricNeeds = () => {
    this.validate(KEYS);
    if (
      KEYS.every((key) => {
        return this.state[key] !== '';
      })
    ) {
      this.fetchDailyCaloricNeeds();
    } else {
      this.setState({ dailyNeeds: 0 });
    }
  };

  validate = (keys) => {
    keys.map((key) => {
      if (this.state[key] === '' || this.state[key] === 0) {
        this.setState({ [`${key}Err`]: REQUIRED_ERR });
        let input = document.getElementById(`daily-needs-${key}`);
        input.classList.add('invalid');
      }
    });
  };

  fetchDailyCaloricNeeds = () => {
    fetch(`http://127.0.0.1:5000/daily-calories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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
        return res.json();
      })
      .then((res) => {
        this.setState({ dailyNeeds: res.daily_caloric_needs });
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <React.Fragment>
        <div id="daily-needs" className="modal">
          <div className="modal-content">
            <h4>Calculate your daily caloric needs</h4>
            <form>
              <div className="input-field">
                <input
                  id="daily-needs-age"
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
                  id="daily-needs-height"
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
                  id="daily-needs-weight"
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
                  id="daily-needs-gender"
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
                  id="daily-needs-trainingsPerWeek"
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
