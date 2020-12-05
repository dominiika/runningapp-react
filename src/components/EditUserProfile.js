import React, { Component } from 'react';
import M from 'materialize-css';

const REQUIRED_ERR = 'This field is required';
const KEYS = ['age', 'height', 'weight'];

class EditUserProfile extends Component {
  state = {
    gender: '',
    age: '',
    height: '',
    weight: '',
    genderErr: null,
    ageErr: null,
    heightErr: null,
    weightErr: null,
    errMsg: null,
  };

  componentDidMount() {
    M.AutoInit();
    var elems = document.querySelectorAll('select');
    M.FormSelect.init(elems, {});
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({
      gender: nextProps.userProfile.gender,
      age: nextProps.userProfile.age,
      weight: nextProps.userProfile.weight,
      height: nextProps.userProfile.height,
    });
  }

  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });

    let name = event.target.name;
    let input = document.getElementById(`edit-user-profile-${name}`);
    input.className = 'text';
    this.setState({
      [name]: event.target.value,
      [`${name}Err`]: null,
      errMsg: null,
    });
  };

  handleRadioInputChange = (event) => {
    this.setState({ gender: event.target.value });
  };

  updateUserProfile = () => {
    this.validateInputs(KEYS);
    if (
      KEYS.every((key) => {
        return this.state[key] !== '';
      })
    ) {
      this.fetchUpdateUserProfile();
    }
  };

  validateInputs = (KEYS) => {
    KEYS.map((key) => {
      if (this.state[key] === '') {
        this.setState({ [`${key}Err`]: REQUIRED_ERR });
        let input = document.getElementById(`edit-training-${key}`);
        input.classList.add('invalid');
      }
    });
  };

  fetchUpdateUserProfile = () => {
    let resStatus = 0;
    fetch(
      `http://127.0.0.1:5000/userprofiles/${this.props.cookies.get('user')}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.props.cookies.get('token')}`,
        },
        body: JSON.stringify({
          gender: this.state.gender,
          age: this.state.age,
          height: this.state.height,
          weight: this.state.weight,
        }),
      }
    )
      .then((res) => {
        resStatus = res.status;
        console.log(res.status);
        return res.json();
      })
      .then((res) => {
        console.log(res);

        if (resStatus === 200) {
          this.setState({ errMsg: null });
          this.props.onLoadUserProfile(res);
          document.getElementById('edit-user-profile').M_Modal.close();
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
    return (
      <div id="edit-user-profile" className="modal">
        {typeof this.state.gender !== undefined ? (
          <React.Fragment>
            <div className="modal-content">
              <h4>Update your profile</h4>
              <form>
                <p>
                  <label>
                    <input
                      name="gender"
                      type="radio"
                      onChange={this.handleRadioInputChange}
                      className="user-profile-gender"
                      value="Female"
                    />
                    <span>Female</span>
                  </label>
                </p>
                <p>
                  <label>
                    <input
                      name="gender"
                      type="radio"
                      onChange={this.handleRadioInputChange}
                      className="user-profile-gender"
                      // value={this.props.userProfile.gender}
                      value="Male"
                      // checked
                    />
                    {/* <span>{this.props.userProfile.gender}</span> */}
                    <span>Male</span>
                  </label>
                </p>

                <div className="input-field">
                  <input
                    type="number"
                    className="text"
                    name="age"
                    onChange={this.handleInputChange}
                    id="edit-user-profile-age"
                    value={this.state.age || ''}
                  />
                  <label htmlFor="age">Age</label>
                  <span className="err-msg text">{this.state.ageErr}</span>
                </div>

                <div className="input-field">
                  <input
                    type="number"
                    className="text"
                    name="height"
                    onChange={this.handleInputChange}
                    id="edit-user-profile-height"
                    value={this.state.height || ''}
                  />
                  <label htmlFor="height">Height</label>
                  <span className="err-msg text">{this.state.heightErr}</span>
                </div>

                <div className="input-field">
                  <input
                    type="number"
                    className="text"
                    name="weight"
                    onChange={this.handleInputChange}
                    id="edit-user-profile-weight"
                    value={this.state.weight || ''}
                  />
                  <label htmlFor="weight">Weight</label>
                  <span className="err-msg text">{this.state.weightErr}</span>
                </div>
              </form>
              <p className="err-msg">{this.state.errMsg}</p>
            </div>
            <div className="modal-footer">
              <button
                type="submit"
                onClick={this.updateUserProfile}
                className="btn cyan accent-3 waves-effect waves-dark black-text"
              >
                Save
              </button>
            </div>
          </React.Fragment>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    );
  }
}

export default EditUserProfile;
