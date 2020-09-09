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
    console.log(this.state.username);
    console.log(this.state.password);
  };

  render() {
    return (
      <React.Fragment>
        <div id="login" className="modal">
          <div className="modal-content">
            <h4>LOGIN</h4>
            <form>
              <div className="input-field">
                <input
                  type="text"
                  className="text"
                  name="height"
                  onChange={this.handleInputChange}
                />
                <label htmlFor="height">Username</label>
              </div>
              <div className="input-field">
                <input
                  type="text"
                  className="text"
                  name="weight"
                  onChange={this.handleInputChange}
                />
                <label htmlFor="weight">Password</label>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="submit"
              // onClick={}
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
