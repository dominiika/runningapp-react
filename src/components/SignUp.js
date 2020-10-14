import React, { Component } from 'react';

class SignUp extends Component {
  state = {
    username: '',
    password: '',
  };

  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleFetchSignup = () => {
    fetch(`http://127.0.0.1:5000/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      }),
    })
      .then((res) => res.json())
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <React.Fragment>
        <div id="signup" className="modal">
          <div className="modal-content">
            <h4>SIGN UP</h4>
            <form>
              <div className="input-field">
                <input
                  type="text"
                  className="text"
                  name="username"
                  onChange={this.handleInputChange}
                />
                <label htmlFor="height">Username</label>
              </div>
              <div className="input-field">
                <input
                  type="password"
                  className="text"
                  name="password"
                  onChange={this.handleInputChange}
                />
                <label htmlFor="weight">Password</label>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="submit"
              onClick={this.handleFetchSignup}
              className="modal-close btn cyan accent-3 waves-effect waves-dark black-text"
            >
              Sign up
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default SignUp;
