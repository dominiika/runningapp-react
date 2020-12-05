import React, { Component } from 'react';

const REQUIRED_ERR = 'This field is required';
const KEYS = ['name', 'distance', 'tempo', 'time'];

class EditTraining extends Component {
  state = {
    name: '',
    distance: '',
    tempo: '',
    time: '',
    distanceErr: null,
    tempoErr: null,
    timeErr: null,
    errMsg: null,
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({
      name: nextProps.training.name,
      distance: nextProps.training.distance,
      tempo: nextProps.training.avg_tempo,
      time: nextProps.training.time_in_seconds,
    });
  }

  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });

    let name = event.target.name;
    let input = document.getElementById(`edit-training-${name}`);
    input.className = 'text';
    this.setState({
      [name]: event.target.value,
      [`${name}Err`]: null,
      errMsg: null,
    });
  };

  updateTraining = () => {
    this.validateInputs(KEYS);
    if (
      KEYS.every((key) => {
        return this.state[key] !== '';
      })
    ) {
      this.fetchUpdateTraining();
    }
  };

  validateInputs = (KEYS) => {
    KEYS.map((key) => {
      if (this.state[key] === '') {
        console.log('empty ', this.state[key]);
        this.setState({ [`${key}Err`]: REQUIRED_ERR });
        let input = document.getElementById(`edit-training-${key}`);
        input.classList.add('invalid');
      }
    });
  };

  fetchUpdateTraining = () => {
    let resStatus = 0;
    fetch(`http://127.0.0.1:5000/trainings/${this.props.training.id}`, {
      method: 'PUT',
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

        if (resStatus === 200) {
          this.setState({ errMsg: null });
          this.props.onLoadTraining(res);
          document.getElementById('edit-training').M_Modal.close();
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
      <div id="edit-training" className="modal">
        <div className="modal-content">
          <h4>UPDATE {this.props.training.name}</h4>
          <form>
            <div className="input-field">
              <input
                type="number"
                className="text"
                name="distance"
                onChange={this.handleInputChange}
                id="edit-training-distance"
                value={this.state.distance}
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
                id="edit-training-tempo"
                value={this.state.tempo}
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
                id="edit-training-time"
                value={this.state.time}
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
            onClick={this.updateTraining}
            className="btn cyan accent-3 waves-effect waves-dark black-text"
          >
            Save
          </button>
        </div>
      </div>
    );
  }
}

export default EditTraining;
