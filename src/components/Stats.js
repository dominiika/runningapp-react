import React, { useEffect, useState } from 'react';
import M from 'materialize-css';
import CountUp from 'react-countup';
import Aos from 'aos';
import 'aos/dist/aos.css';
import VisibilitySensor from 'react-visibility-sensor';

function Stats() {
  const [focus, setFocus] = useState(false);
  const [usersNumber, setUsersNumber] = useState(0);
  const [kilometersNumber, setKilometersNumber] = useState(0);
  const [caloriesNumber, setCaloriesNumber] = useState(0);

  useEffect(() => {
    M.AutoInit();
    fetchUsersNumber();
    fetchKilometersNumber();
    fetchCaloriesNumber();
    document.querySelectorAll('.count');
    Aos.init({ duration: 2000 });
  }, []);

  const fetchUsersNumber = () => {
    fetch(`http://127.0.0.1:5000/total-users-number`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((resp) => resp.json())
      .then((res) => {
        setUsersNumber(res.users_number);
      })
      .catch((error) => console.log(error));
  };

  const fetchKilometersNumber = () => {
    fetch(`http://127.0.0.1:5000/total-kilometers-number`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((resp) => resp.json())
      .then((res) => {
        setKilometersNumber(res.kilometers_number);
      })
      .catch((error) => console.log(error));
  };

  const fetchCaloriesNumber = () => {
    fetch(`http://127.0.0.1:5000/total-calories-number`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((resp) => resp.json())
      .then((res) => {
        setCaloriesNumber(res.calories_number);
      })
      .catch((error) => console.log(error));
  };

  return (
    <React.Fragment>
      <section className="section-stats">
        <div className="container">
          <div className="row" data-aos="fade">
            <div className="col s12 m4 center">
              <div className="stats-square card-panel z-depth-2 grey darken-4 white-text">
                <i className="fas fa-users medium"></i>
                <CountUp
                  className="counter"
                  duration={5}
                  start={focus ? 0 : null}
                  redraw={true}
                  end={usersNumber}
                >
                  {({ countUpRef }) => (
                    <div>
                      <span className="count-up-number" ref={countUpRef} />
                      <VisibilitySensor
                        onChange={(isVisible) => {
                          if (isVisible) {
                            setFocus(true);
                          }
                        }}
                      >
                        <p>registered users</p>
                      </VisibilitySensor>
                    </div>
                  )}
                </CountUp>
                <div className="progress white">
                  <div
                    className="determinate cyan accent-3"
                    style={{ width: '50%' }}
                  ></div>
                </div>
              </div>
            </div>
            <div className="col s12 m4 center">
              <div className="stats-square z-depth-2 card-panel cyan accent-3 grey-text text-darken-4">
                <i className="fas fa-shoe-prints medium"></i>
                <CountUp
                  className="counter"
                  start={focus ? 0 : null}
                  end={kilometersNumber}
                  duration={3.5}
                  useEasing={true}
                  useGrouping={true}
                >
                  {({ countUpRef }) => (
                    <div>
                      <span className="count-up-number" ref={countUpRef} />
                      <VisibilitySensor
                        onChange={(isVisible) => {
                          if (isVisible) {
                            setFocus(true);
                          }
                        }}
                      >
                        <p>kilometers run</p>
                      </VisibilitySensor>
                    </div>
                  )}
                </CountUp>
                <div className="progress white">
                  <div
                    className="determinate grey darken-4"
                    style={{ width: '90%' }}
                  ></div>
                </div>
              </div>
            </div>
            <div className="col s12 m4 center">
              <div className="stats-square z-depth-2 card-panel grey darken-4 white-text">
                <i className="fas fa-fire-alt medium"></i>
                <CountUp
                  className="counter"
                  start={focus ? 0 : null}
                  end={caloriesNumber}
                  duration={3.5}
                  useEasing={true}
                  useGrouping={true}
                >
                  {({ countUpRef }) => (
                    <div>
                      <span className="count-up-number" ref={countUpRef} />
                      <VisibilitySensor
                        onChange={(isVisible) => {
                          if (isVisible) {
                            setFocus(true);
                          }
                        }}
                      >
                        <p>calories burnt</p>
                      </VisibilitySensor>
                    </div>
                  )}
                </CountUp>
                <div className="progress white">
                  <div
                    className="determinate cyan accent-3"
                    style={{ width: '80%' }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          <div className="divider"></div>
        </div>
      </section>
    </React.Fragment>
  );
}

export default Stats;
