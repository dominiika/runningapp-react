import React, { useEffect } from 'react';
import M from 'materialize-css';
import Bmi from './Bmi';
import Login from './Login';
import SignUp from './SignUp';
import Logout from './Logout';
import AddTraining from './AddTraining';
import DailyNeeds from './DailyNeeds';
import { Link, withRouter } from 'react-router-dom';

function Navbar(props) {
  useEffect(() => {
    M.AutoInit();
    handleSidenavInit();
    handleSliderInit();
    handleModalInit();
    handleDropdownInit();
  }, []);

  const handleSidenavInit = () => {
    let elems = document.querySelectorAll('.sidenav');
    let options = {
      inDuration: 300,
      outDuration: 300,
    };
    M.Sidenav.init(elems, options);
  };

  const handleSliderInit = () => {
    let options = {
      indicators: false,
      height: 500,
      interval: 3000,
    };
    let elems = document.querySelectorAll('.slider');
    M.Slider.init(elems, options);
  };

  const handleModalInit = () => {
    let options = {};
    let elems = document.querySelectorAll('.modal');
    M.Modal.init(elems, options);
  };

  const handleDropdownInit = () => {
    let options = {};
    let elems = document.querySelectorAll('.dropdown-trigger');
    M.Dropdown.init(elems, options);
  };

  return (
    <React.Fragment>
      {/* Nav */}
      <header className="section-primary-header">
        <div className="navbar-fixed">
          <nav className="nav-extended grey darken-4">
            <div className="nav-wrapper">
              <Link to="/" className="brand-logo">
                <i className="material-icons large cyan-text text-accent-3 icon-logo">
                  directions_run
                </i>
                <strong className="logo-text">RunUp</strong>
              </Link>
              <Link
                to="#"
                data-target="mobile-demo"
                className="sidenav-trigger"
              >
                <i className="material-icons">menu</i>
              </Link>
              <ul id="nav-mobile" className="right hide-on-med-and-down">
                {props.cookies.get('token') ? (
                  <React.Fragment>
                    <li>
                      <a href="#add-training" className="modal-trigger">
                        <i className="material-icons">add</i>
                      </a>
                    </li>
                    <li>
                      <Link to="/trainings">Trainings</Link>
                    </li>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <li>
                      <a href="#signup" className="modal-trigger">
                        Sign Up
                      </a>
                    </li>
                    <li>
                      <a
                        href="#login"
                        className="btn cyan accent-3 waves-effect waves-dark black-text modal-trigger"
                      >
                        LOGIN
                      </a>
                    </li>
                  </React.Fragment>
                )}
                <li>
                  <a className="last-nav-li modal-trigger" href="#bmi">
                    BMI
                  </a>
                </li>
                <li>
                  <a className="last-nav-li modal-trigger" href="#daily-needs">
                    Daily Caloric Needs
                  </a>
                </li>

                {props.cookies.get('token') && (
                  <React.Fragment>
                    <li>
                      <a href="#" className="cyan-text text-accent-3">
                        Hi, {props.cookies.get('username')}!
                      </a>
                    </li>
                    <Logout cookies={props.cookies} mobile={false} />
                    <li>
                      <a
                        href="#"
                        className="dropdown-trigger white-text"
                        data-target="dropdown1"
                      >
                        <i className="fa fa-user" aria-hidden="true"></i>
                      </a>
                    </li>
                  </React.Fragment>
                )}
              </ul>
            </div>
          </nav>
        </div>

        {/* Side Nav */}
        <ul className="sidenav white-text" id="mobile-demo">
          <li>
            <div className="user-view">
              <div className="background black"></div>

              <h4 className="">
                <i className="material-icons cyan-text text-accent-3">
                  directions_run
                </i>
                RunUp
              </h4>
            </div>
          </li>
          <li>
            <a href="#add-training" className="modal-trigger">
              <i className="material-icons black-text">add</i>
            </a>
          </li>
          <li>
            <Link to="/trainings">Trainings</Link>
          </li>
          {!props.cookies.get('token') && (
            <React.Fragment>
              <li>
                <a href="#login" className="modal-trigger">
                  Log In
                </a>
              </li>
              <li>
                <a href="#signup" className="modal-trigger">
                  Sign Up
                </a>
              </li>
            </React.Fragment>
          )}

          <li>
            <a href="#bmi" className="modal-trigger">
              BMI
            </a>
          </li>
          <li>
            <a className="last-nav-li modal-trigger" href="#daily-needs">
              Daily Caloric Needs
            </a>
          </li>
          {props.cookies.get('token') && (
            <React.Fragment>
              <li>
                <a href="#" className="cyan-text text-accent-5">
                  Hi, {props.cookies.get('username')}!
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fa fa-user black-text" aria-hidden="true"></i>
                </a>
              </li>
              <Logout cookies={props.cookies} mobile={true} />
            </React.Fragment>
          )}
        </ul>

        {/* Dropdown menu */}
        <ul id="dropdown1" className="dropdown-content">
          <li>
            <a href="/profile">Your Profile</a>
          </li>
          <li>
            <a href="#!">Change Password</a>
          </li>
          <li className="divider" tabIndex="-1"></li>
        </ul>
      </header>

      <Bmi />
      <Login cookies={props.cookies} />
      <SignUp cookies={props.cookies} />
      <AddTraining cookies={props.cookies} />
      <DailyNeeds cookies={props.cookies} />
    </React.Fragment>
  );
}

export default withRouter(Navbar);
