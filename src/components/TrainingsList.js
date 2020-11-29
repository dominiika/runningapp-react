import React, { useEffect, useState, useContext } from 'react';
import Training from './Training';
import Divider from './Divider';
import { Context } from '../Store';
import Header from './Header';

function TrainingsList(props) {
  const [globalState, setGlobalState] = useContext(Context);
  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    if (props.cookies.get('token')) {
      fetchTrainings();
    }
  }, []);

  useEffect(() => {
    if (globalState.refetch) {
      fetchTrainings();
    }
  });

  const fetchTrainings = () => {
    fetch(`http://127.0.0.1:5000/trainings`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${props.cookies.get('token')}`,
      },
    })
      .then((resp) => resp.json())
      .then((res) => {
        setTrainings(res.trainings);
        setGlobalState({ didLogIn: false, didLogOut: false, refetch: false });
      })
      .catch((error) => console.log(error));
  };

  return (
    <React.Fragment>
      <Header />
      <Divider />
      <section className="section-trainings-list">
        <h2 className="center bolder-text">Your trainings</h2>
        <div className="divider"></div>
        <div className="container">
          {trainings && trainings.length > 0 ? (
            <React.Fragment>
              <br />
              {trainings.map((training) => {
                return (
                  <div key={training.id}>
                    <ul className="collection z-depth-2">
                      <li className="collection-item avatar grey lighten-5">
                        <Training training={training} cookies={props.cookies} />
                      </li>
                    </ul>
                  </div>
                );
              })}
            </React.Fragment>
          ) : null}
        </div>
      </section>
      <Divider />
    </React.Fragment>
  );
}

export default TrainingsList;
