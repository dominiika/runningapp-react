import React, { Component } from 'react';

class Bmi extends Component {
  state = {
    height: 0,
    weight: 0,
  };

  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleFetchBmi = (event) => {
    // console.log(this.state.height);
    // console.log(this.state.weight);
    event.preventDefault();
    fetch(`http://127.0.0.1:5000/bmi`, {
      method: 'POST',
    })
      .then((res) => res.json())
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
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
                  type="text"
                  className="text"
                  name="height"
                  onChange={this.handleInputChange}
                />
                <label htmlFor="height">Height</label>
              </div>
              <div className="input-field">
                <input
                  type="text"
                  className="text"
                  name="weight"
                  onChange={this.handleInputChange}
                />
                <label htmlFor="weight">Weight</label>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="submit"
              onClick={this.handleFetchBmi}
              className="modal-close btn cyan accent-3 waves-effect waves-dark black-text"
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
