import React, { Component } from 'react';

class Bmi extends Component {
  state = {
    height: 0,
    weight: 0,
    bmi: 0,
    msg: null,
  };

  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  calculateBmi = () => {
    let validated = this.validate(this.state.weight, this.state.height);
    if (validated) {
      let bmi = Math.round(this.state.weight / (this.state.height / 100) ** 2);
      this.setState({ bmi });
      this.getMessage(bmi);
    }
  };

  getMessage = (bmi) => {
    if (bmi < 18.5) {
      this.setState({ msg: "You're underweight." });
    } else if (18.5 <= bmi && bmi <= 24.9) {
      this.setState({ msg: 'Your weight is correct.' });
    } else if (25 <= bmi && bmi <= 29.9) {
      this.setState({ msg: "You're overweight." });
    } else {
      this.setState({ msg: "You're obese." });
    }
  };

  validate = (weight, height) => {
    if (weight < 30 || weight > 200 || height < 120 || height > 250) {
      this.setState({
        msg:
          'Please provide numerical values in range 30-200 (weight) and 120-250 (height).',
      });
      return false;
    }
    return true;
  };

  render() {
    return (
      <React.Fragment>
        <div id="bmi" className="modal">
          <div className="modal-content">
            <h4>Calculate your BMI</h4>
            <form>
              <div className="input-field">
                <input
                  className="text"
                  name="height"
                  onChange={this.handleInputChange}
                  type="number"
                />
                <label htmlFor="height">Height</label>
              </div>
              <div className="input-field">
                <input
                  className="text"
                  name="weight"
                  onChange={this.handleInputChange}
                  type="number"
                />
                <label htmlFor="weight">Weight</label>
              </div>
            </form>
            <span className="text-center">
              Your BMI is: <strong>{this.state.bmi}</strong>
              <br />
              {this.state.msg}
            </span>
          </div>
          <div className="modal-footer">
            <button
              onClick={this.calculateBmi}
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

export default Bmi;
