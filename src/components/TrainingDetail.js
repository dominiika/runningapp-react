import React, { useEffect, useContext, useState, useRef } from 'react';
import M from 'materialize-css';
import Header from './Header';
import Divider from './Divider';
import EditTraining from './EditTraining';
import DeleteTraining from './DeleteTraining';
import { Context } from '../Store';

function TrainingDetail(props) {
  const [globalState, setGlobalState] = useContext(Context);
  const [id, setId] = useState(Number(props.match.params.id));
  const [training, setTraining] = useState({});

  useEffect(() => {
    M.AutoInit();
    handleModalInit();
    fetchTraining();
  }, []);

  useEffect(() => {
    if (globalState.refetch) {
      fetchTraining();
    }
  });

  const handleModalInit = () => {
    let options = {};
    let elems = document.querySelectorAll('.modal');
    M.Modal.init(elems, options);
  };

  const fetchTraining = () => {
    console.log('fetched training detail');
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
        setGlobalState({ didLogIn: false, didLogOut: false, refetch: false });
      })
      .catch((error) => console.log(error));
  };

  const handleLoadTraining = (training) => {
    setTraining(training);
  };

  return (
    <React.Fragment>
      {Object.keys(training).length > 1 ? (
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
                  <a href="#edit-training" className="modal-trigger">
                    <i className="fas fa-edit blue-text"></i>
                  </a>

                  <a href="#delete-training" className="modal-trigger">
                    <i className="fas fa-trash-alt red-text"></i>
                  </a>
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

      <EditTraining
        training={training}
        cookies={props.cookies}
        onLoadTraining={handleLoadTraining}
      />
      <DeleteTraining training={training} cookies={props.cookies} />
    </React.Fragment>
  );
}

export default TrainingDetail;
