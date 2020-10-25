import React, { Component } from 'react';

class Login extends Component {
  state = {
    username: '',
    password: '',
  };

  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleFetchLogin = () => {
    let resStatus = 0;
    fetch(`http://127.0.0.1:5000/login`, {
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
        if (resStatus === 200) {
          this.tokenSetUp(res);
          console.log(res);
        }
      })
      .catch((err) => console.log(err));
    // window.location.reload();
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
    console.log(this.props.cookies);
    return (
      <React.Fragment>
        <div id="login" className="modal">
          <div className="modal-content">
            <h4>LOG IN</h4>
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
              onClick={this.handleFetchLogin}
              className="modal-close btn cyan accent-3 waves-effect waves-dark black-text"
            >
              Login
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Login;
