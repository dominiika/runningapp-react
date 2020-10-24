import React, { Component } from 'react';

class TrainingsList extends Component {
  state = {
    trainings: [],
    isLoading: true,
  };

  componentDidMount() {
    if (this.props.cookies.get('token')) {
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
    console.log(this.state.trainings);
    return (
      <div className="container">
        <h3 className="center">Your trainings</h3>
        {this.state.trainings && this.state.trainings.length > 0 ? (
          <React.Fragment>
            {this.state.trainings.map((training) => {
              // return <p key={training.id}>{training.name}</p>;
              return (
                <div>
                  <ul className="collection z-depth-2">
                    <li className="collection-item avatar">
                      <img src="images/yuna.jpg" alt="" className="circle" />
                      <h5 className="">{training.name}</h5>
                      <p>
                        {training.distance} km <br />
                        {training.calories} calories burnt <br />
                        {training.time_in_seconds / 60} minutes <br />
                        {training.avg_tempo} km/h on average <br />
                        {training.date} <br />
                      </p>
                      <a href="#!" className="secondary-content">
                        {/* <i className="material-icons">grade</i> */}
                        See more details
                        <i
                          style={{ paddingLeft: '5px' }}
                          className="fas fa-angle-double-right"
                        ></i>
                      </a>
                    </li>
                  </ul>
                </div>
              );
            })}
          </React.Fragment>
        ) : null}

        {/* <ul className="collection z-depth-2">
          <li className="collection-item avatar">
            <img src="images/yuna.jpg" alt="" className="circle" />
            <span className="title">Title</span>
            <p>
              First Line <br />
              Second Line
            </p>
            <a href="#!" className="secondary-content">
              <i className="material-icons">grade</i>
            </a>
          </li>
        </ul> */}
      </div>
    );
  }
}

export default TrainingsList;
