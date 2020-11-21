import React, { Component, useEffect, useContext, useState } from 'react';
import Header from './Header';
import Divider from './Divider';
import { Context } from '../Store';

function TrainingDetail(props) {
  const [globalState, setGlobalState] = useContext(Context);
  const [id, setId] = useState(Number(props.match.params.id));
  const [training, setTraining] = useState({});

  useEffect(() => {
    fetchTraining();
  }, []);

  useEffect(() => {
    if (globalState.refetch) {
      fetchTraining();
    }
  });

  const fetchTraining = () => {
    fetch(`http://127.0.0.1:5000/trainings/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${props.cookies.get('token')}`,
      },
    })
      .then((resp) => resp.json())
      .then((res) => {
        setTraining(res);
        // this.setState({ training: res, isLoading: false, fetched: true });
      })
      .catch((error) => console.log(error));
  };

  console.log(Object.keys(training));

  return (
    <React.Fragment>
      {Object.keys(training).length > 0 ? (
        <React.Fragment>
          <Header title="" />
          <Divider />
          <section className="container section-training-detail">
            <h4 className="center bolder-text">
              {training.name.toUpperCase()}
            </h4>
            <p className="center grey-text">{training.date}</p>
            <div className="row training-squares">
              <div className="col s12 m4 center">
                <div className="card-panel blue accent-3 white-text z-depth-2">
                  <i className="fas fa-fire-alt small"></i>
                  <p>{training.calories} calories burnt</p>
                </div>
              </div>

              <div className="col s12 m4 center">
                <div className="card-panel indigo darken-3 white-text z-depth-2">
                  <i className="fas fa-running small"></i>
                  <p>{training.distance} kilometers run</p>
                </div>
              </div>

              <div className="col s12 m4 center">
                <div className="card-panel green accent-4 white-text z-depth-2">
                  <i className="fas fa-clock small"></i>
                  <p>{training.time_in_seconds / 60} minutes</p>
                </div>
              </div>
            </div>

            <div className="card-panel training-stats z-depth-2">
              <div className="row">
                <div className="col s12 m10">
                  <h5 className="bolder-text">Your training stats</h5>
                </div>
                <div className="col s12 m2">
                  <i className="fas fa-edit blue-text"></i>
                  <i className="fas fa-trash-alt red-text"></i>
                </div>
              </div>

              <p style={{ paddingLeft: '10px' }}>
                <span className="bolder-text">Name:</span> {training.name}{' '}
                <br />
                <span className="bolder-text">Distance:</span>{' '}
                {training.distance} km <br />
                <span className="bolder-text">Calories burnt:</span>{' '}
                {training.calories} <br />
                <span className="bolder-text">Time:</span>{' '}
                {training.time_in_seconds / 60} minutes <br />
                <span className="bolder-text">Average tempo:</span>{' '}
                {training.avg_tempo} km/h <br />
                <span className="bolder-text">Date:</span> {training.date}{' '}
                <br />
              </p>
              <p className="center bolder-text">
                Congratulations! You did a great job!
              </p>
            </div>
          </section>
          <Divider />
        </React.Fragment>
      ) : null}
    </React.Fragment>
  );
}

// class TrainingDetail extends Component {
//   state = {
//     id: Number(this.props.match.params.id),
//     training: {},
//     isLoading: true,
//     prevToken: this.props.cookies.get('token'),
//     fetched: false,
//   };

//   componentDidMount() {
//     this.fetchTraining();
//   }

//   componentDidUpdate() {
//     let currentToken = this.props.cookies.get('token');
//     if (this.state.prevToken !== currentToken && !this.state.fetched) {
//       this.fetchTraining();
//     }
//   }

//   fetchTraining = () => {
//     fetch(`http://127.0.0.1:5000/trainings/${this.state.id}`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${this.props.cookies.get('token')}`,
//       },
//     })
//       .then((resp) => resp.json())
//       .then((res) => {
//         this.setState({ training: res, isLoading: false, fetched: true });
//       })
//       .catch((error) => console.log(error));
//   };

//   render() {
//     return (
//       <React.Fragment>
//         {Object.keys(this.state.training).length > 0 ? (
//           <React.Fragment>
//             <Header title="" />
//             <Divider />
//             <section className="container section-training-detail">
//               <h4 className="center bolder-text">
//                 {this.state.training.name.toUpperCase()}
//               </h4>
//               <p className="center grey-text">{this.state.training.date}</p>
//               <div className="row training-squares">
//                 <div className="col s12 m4 center">
//                   <div className="card-panel blue accent-3 white-text z-depth-2">
//                     <i className="fas fa-fire-alt small"></i>
//                     <p>{this.state.training.calories} calories burnt</p>
//                   </div>
//                 </div>

//                 <div className="col s12 m4 center">
//                   <div className="card-panel indigo darken-3 white-text z-depth-2">
//                     <i className="fas fa-running small"></i>
//                     <p>{this.state.training.distance} kilometers run</p>
//                   </div>
//                 </div>

//                 <div className="col s12 m4 center">
//                   <div className="card-panel green accent-4 white-text z-depth-2">
//                     <i className="fas fa-clock small"></i>
//                     <p>{this.state.training.time_in_seconds / 60} minutes</p>
//                   </div>
//                 </div>
//               </div>

//               <div className="card-panel training-stats z-depth-2">
//                 <div className="row">
//                   <div className="col s12 m10">
//                     <h5 className="bolder-text">Your training stats</h5>
//                   </div>
//                   <div className="col s12 m2">
//                     <i className="fas fa-edit blue-text"></i>
//                     <i className="fas fa-trash-alt red-text"></i>
//                   </div>
//                 </div>

//                 <p style={{ paddingLeft: '10px' }}>
//                   <span className="bolder-text">Name:</span>{' '}
//                   {this.state.training.name} <br />
//                   <span className="bolder-text">Distance:</span>{' '}
//                   {this.state.training.distance} km <br />
//                   <span className="bolder-text">Calories burnt:</span>{' '}
//                   {this.state.training.calories} <br />
//                   <span className="bolder-text">Time:</span>{' '}
//                   {this.state.training.time_in_seconds / 60} minutes <br />
//                   <span className="bolder-text">Average tempo:</span>{' '}
//                   {this.state.training.avg_tempo} km/h <br />
//                   <span className="bolder-text">Date:</span>{' '}
//                   {this.state.training.date} <br />
//                 </p>
//                 <p className="center bolder-text">
//                   Congratulations! You did a great job!
//                 </p>
//               </div>
//             </section>
//             <Divider />
//           </React.Fragment>
//         ) : null}
//       </React.Fragment>
//     );
//   }
// }

export default TrainingDetail;
