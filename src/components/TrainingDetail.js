import React, { Component } from 'react';
import Header from './Header';

class TrainingDetail extends Component {
  state = {
    id: Number(this.props.match.params.id),
    training: {},
    isLoading: true,
    prevToken: this.props.cookies.get('token'),
  };

  componentDidMount() {
    this.fetchTraining();
  }

  componentDidUpdate() {
    let currentToken = this.props.cookies.get('token');
    if (this.state.prevToken !== currentToken) {
      this.fetchTraining();
    }
  }

  fetchTraining = () => {
    fetch(`http://127.0.0.1:5000/trainings/${this.state.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.props.cookies.get('token')}`,
      },
    })
      .then((resp) => resp.json())
      .then((res) => {
        this.setState({ training: res, isLoading: false });
      })
      .catch((error) => console.log(error));
  };

  render() {
    console.log(this.state.training);
    return (
      <React.Fragment>
        {Object.keys(this.state.training).length > 0 ? (
          <React.Fragment>
            <Header title={this.state.training.name} />
            <section>{this.state.training.name}</section>
          </React.Fragment>
        ) : null}
      </React.Fragment>
    );
  }
}

export default TrainingDetail;
