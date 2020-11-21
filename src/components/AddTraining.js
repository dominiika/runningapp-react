import React, { Component } from 'react';

const REQUIRED_ERR = 'This field is required';
const KEYS = ['name', 'distance', 'tempo', 'time'];

class AddTraining extends Component {
  state = {
    name: '',
    distance: '',
    tempo: '',
    time: '',
    nameErr: null,
    distanceErr: null,
    tempoErr: null,
    timeErr: null,
    errMsg: null,
  };

  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });

    let name = event.target.name;
    let input = document.getElementById(`add-training-${name}`);
    input.className = 'text';
    this.setState({
      [name]: event.target.value,
      [`${name}Err`]: null,
      errMsg: null,
    });
  };

  addTraining = () => {
    this.validateInputs(KEYS);

    if (
      KEYS.every((key) => {
        return this.state[key] !== '';
      })
    ) {
      console.log(this.state.name);
      console.log(this.state.distance);
      console.log(this.state.tempo);
      console.log(this.state.time);

      this.fetchAddTraining();
    }
  };

  validateInputs = (KEYS) => {
    KEYS.map((key) => {
      if (this.state[key] === '') {
        console.log('empty ', this.state[key]);
        this.setState({ [`${key}Err`]: REQUIRED_ERR });
        let input = document.getElementById(`add-training-${key}`);
        input.classList.add('invalid');
      }
    });
  };

  fetchAddTraining = () => {
    console.log('fetching...');
    let resStatus = 0;
    fetch(`http://127.0.0.1:5000/trainings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.props.cookies.get('token')}`,
      },
      body: JSON.stringify({
        name: this.state.name,
        distance: this.state.distance,
        avg_tempo: this.state.tempo,
        time_in_seconds: this.state.time,
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
          this.setState({ errMsg: null });
          document.getElementById('add-training').M_Modal.close();
        } else {
          this.setState({ errMsg: res.msg });
          // KEYS.map((key) => {
          //   document
          //     .getElementById(`add-training-${key}`)
          //     .classList.add('invalid');
          // });
        }
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div id="add-training" className="modal">
        <div className="modal-content">
          <h4>NEW TRAINING</h4>
          <form>
            <div className="input-field">
              <input
                type="text"
                className="text"
                name="name"
                onChange={this.handleInputChange}
                id="add-training-name"
              />
              <label htmlFor="name">Name</label>
              <span className="err-msg text">{this.state.nameErr}</span>
            </div>

            <div className="input-field">
              <input
                type="number"
                className="text"
                name="distance"
                onChange={this.handleInputChange}
                id="add-training-distance"
              />
              <label htmlFor="distance">Distance (km)</label>
              <span className="err-msg text">{this.state.distanceErr}</span>
            </div>

            <div className="input-field">
              <input
                type="number"
                className="text"
                name="tempo"
                onChange={this.handleInputChange}
                id="add-training-tempo"
              />
              <label htmlFor="tempo">Average tempo (km/h)</label>
              <span className="err-msg text">{this.state.tempoErr}</span>
            </div>

            <div className="input-field">
              <input
                type="number"
                className="text"
                name="time"
                onChange={this.handleInputChange}
                id="add-training-time"
              />
              <label htmlFor="time">Time (seconds)</label>
              <span className="err-msg text">{this.state.timeErr}</span>
            </div>
          </form>
          <p className="err-msg">{this.state.errMsg}</p>
        </div>

        <div className="modal-footer">
          <button
            type="submit"
            onClick={this.addTraining}
            className="btn cyan accent-3 waves-effect waves-dark black-text"
          >
            Add
          </button>
        </div>
      </div>
    );
  }
}

export default AddTraining;