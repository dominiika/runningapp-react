import React, { Component } from 'react';

const REQUIRED_ERR = 'This field is required';

class Login extends Component {
  state = {
    username: '',
    password: '',
    usernameErr: null,
    passwordErr: null,
    msg: null,
  };

  handleInputChange = (event) => {
    let name = event.target.name;
    let input = document.getElementById(`login-${name}`);
    input.className = 'text';
    this.setState({
      [name]: event.target.value,
      [`${name}Err`]: null,
      msg: null,
    });
  };

  login = () => {
    this.validateInputs();
    if (this.state.username !== '' && this.state.password !== '') {
      this.fetchLogin();
    }
  };

  validateInputs = () => {
    if (this.state.username === '') {
      this.setState({ usernameErr: REQUIRED_ERR });
      let usernameInput = document.getElementById('login-username');
      usernameInput.classList.add('invalid');
    }
    if (this.state.password === '') {
      this.setState({ passwordErr: REQUIRED_ERR });
      let passwordInput = document.getElementById('login-password');
      passwordInput.classList.add('invalid');
    }
  };

  fetchLogin = () => {
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
          document.getElementById('login').M_Modal.close();
        } else {
          this.setState({ msg: res.message });
          document.getElementById('login-username').classList.add('invalid');
          document.getElementById('login-password').classList.add('invalid');
        }
      })
      .catch((err) => console.log(err));
  };

  tokenSetUp = (res) => {
    let path = '/';
    let today = new Date();
    let tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
    this.props.cookies.set('token', res.access_token, {
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
    console.log('username err', this.props.usernameErr);
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
                  id="login-username"
                />
                <label htmlFor="username">Username</label>
                <span className="err-msg text">{this.state.usernameErr}</span>
              </div>
              <div className="input-field">
                <input
                  type="password"
                  className="text"
                  name="password"
                  onChange={this.handleInputChange}
                  id="login-password"
                />
                <label htmlFor="weight">Password</label>
                <span className="err-msg text">{this.state.passwordErr}</span>
              </div>
            </form>
            <p className="err-msg">{this.state.msg}</p>
          </div>
          <div className="modal-footer">
            <button
              type="submit"
              onClick={this.login}
              className="btn cyan accent-3 waves-effect waves-dark black-text"
              id="login-btn"
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
