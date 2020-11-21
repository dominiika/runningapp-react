import React, { useEffect, useContext } from 'react';
import M from 'materialize-css';
import Bmi from './Bmi';
import Login from './Login';
import SignUp from './SignUp';
import { Link, withRouter } from 'react-router-dom';
import { Context } from '../Store';

function Navbar(props) {
  const [globalState, setGlobalState] = useContext(Context);

  useEffect(() => {
    M.AutoInit();
    handleSidenavInit();
    handleSliderInit();
    handleModalInit();
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

  const handleLogOut = () => {
    fetch('http://127.0.0.1:5000/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: props.cookies.get('token'),
      },
    })
      .then(setGlobalState({ refetch: true }))
      .catch((err) => console.log(err));
    let path = '/';
    props.cookies.remove('token', {
      path: path,
    });
    props.cookies.remove('user', {
      path: path,
    });
    props.cookies.remove('username', {
      path: path,
    });
    // window.location.reload();
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
                <strong>RunUp</strong>
              </Link>
              <Link
                to="#"
                data-target="mobile-demo"
                className="sidenav-trigger"
              >
                <i className="material-icons">menu</i>
              </Link>
              <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li>
                  <Link to="/test">
                    <i className="material-icons">add</i>
                  </Link>
                </li>
                <li>
                  <Link to="/trainings">Trainings</Link>
                </li>
                {!props.cookies.get('token') && (
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
                {props.cookies.get('token') && (
                  <React.Fragment>
                    <li>
                      <a href="#" className="cyan-text text-accent-3">
                        Hi, {props.cookies.get('username')}!
                      </a>
                    </li>
                    <li>
                      <a onClick={handleLogOut}>Log out</a>
                    </li>
                    <li>
                      <a href="#">
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
            <Link to="#">
              <i className="material-icons black-text">add</i>
            </Link>
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
              <li>
                <a href="#" onClick={handleLogOut} className="modal-trigger">
                  Log out
                </a>
              </li>
            </React.Fragment>
          )}
        </ul>
      </header>

      <Bmi />
      <Login cookies={props.cookies} />
      <SignUp cookies={props.cookies} />
    </React.Fragment>
  );
}

export default withRouter(Navbar);
