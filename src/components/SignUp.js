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
    let resStatus = 0;
    fetch(`http://127.0.0.1:5000/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      }),
    })
      .then((res) => {
        resStatus = res.status;
        console.log(res.status);
        return res.json();
      })
      .then((res) => {
        if (resStatus === 201) {
          this.tokenSetUp(res);
          console.log(res);
        }
      })
      .catch((err) => console.log(err));
    window.location.reload();
  };

  tokenSetUp = (res) => {
    let path = '/';
    let today = new Date();
    let tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
    this.props.cookies.set('token', res.token, {
      expires: tomorrow,
      path: path,
    });
    this.props.cookies.set('user', res.user, {
      expires: tomorrow,
      path: path,
    });
    this.props.cookies.set('username', res.username, {
      expires: tomorrow,
      path: path,
    });
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
