import React, { Component } from 'react';

const REQUIRED_ERR = 'This field is required';

class SignUp extends Component {
  state = {
    username: '',
    password: '',
    usernameErr: null,
    passwordErr: null,
    errMsg: null,
    successMsg: null,
  };

  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
    let name = event.target.name;
    let input = document.getElementById(`signup-${name}`);
    input.className = 'text';
    this.setState({
      [name]: event.target.value,
      [`${name}Err`]: null,
      errMsg: null,
      successMsg: null,
    });
  };

  signUp = () => {
    this.validateInputs();
    if (this.state.username !== '' && this.state.password !== '') {
      this.fetchSignup();
    }
  };

  validateInputs = () => {
    if (this.state.username === '') {
      this.setState({ usernameErr: REQUIRED_ERR });
      let usernameInput = document.getElementById('signup-username');
      usernameInput.classList.add('invalid');
    }
    if (this.state.password === '') {
      this.setState({ passwordErr: REQUIRED_ERR });
      let passwordInput = document.getElementById('signup-password');
      passwordInput.classList.add('invalid');
    }
  };

  fetchSignup = () => {
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
        console.log(res);

        if (resStatus === 201) {
          this.tokenSetUp(res);
          this.setState({ successMsg: res.message });
          document.getElementById('signup').M_Modal.close();
        } else {
          this.setState({ errMsg: res.message });

          document.getElementById('signup-username').classList.add('invalid');
          document.getElementById('signup-password').classList.add('invalid');
        }
      })
      .catch((err) => console.log(err));
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
                  id="signup-username"
                />
                <label htmlFor="height">Username</label>
                <span className="err-msg text">{this.state.usernameErr}</span>
              </div>
              <div className="input-field">
                <input
                  type="password"
                  className="text"
                  name="password"
                  onChange={this.handleInputChange}
                  id="signup-password"
                />
                <label htmlFor="weight">Password</label>
                <span className="err-msg text">{this.state.passwordErr}</span>
              </div>
            </form>
            <p className="err-msg">{this.state.errMsg}</p>
            {/* <p className="green-text text-accent-4">{this.state.successMsg}</p> */}
          </div>
          <div className="modal-footer">
            <button
              type="submit"
              onClick={this.signUp}
              className="btn cyan accent-3 waves-effect waves-dark black-text"
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
