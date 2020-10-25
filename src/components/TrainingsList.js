import React, { Component } from 'react';
import Training from './Training';
import Header from './Header';

class TrainingsList extends Component {
  state = {
    trainings: [],
    isLoading: true,
    prevToken: this.props.cookies.get('token'),
  };

  componentDidMount() {
    if (this.props.cookies.get('token')) {
      this.fetchTrainings();
    }
  }

  componentDidUpdate() {
    let currentToken = this.props.cookies.get('token');
    if (this.state.prevToken !== currentToken) {
      this.fetchTrainings();
    }
  }

  fetchTrainings = () => {
    fetch(`http://127.0.0.1:5000/trainings`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.props.cookies.get('token')}`,
      },
    })
      .then((resp) => resp.json())
      .then((res) => {
        this.setState({ trainings: res.trainings, isLoading: false });
      })
      .catch((error) => console.log(error));
  };

  render() {
    // console.log('prev in render', this.state.prevProps);
    return (
      <React.Fragment>
        <Header title="Your trainings" />
        <section>
          <div className="container">
            {this.state.trainings && this.state.trainings.length > 0 ? (
              <React.Fragment>
                {this.state.trainings.map((training) => {
                  // return <p key={training.id}>{training.name}</p>;
                  return (
                    <div key={training.id}>
                      <ul className="collection z-depth-2">
                        <li className="collection-item avatar">
                          <Training training={training} />
                        </li>
                      </ul>
                    </div>
                  );
                })}
              </React.Fragment>
            ) : null}
          </div>
        </section>
      </React.Fragment>
    );
  }
}

export default TrainingsList;
