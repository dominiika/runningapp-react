import React, { useEffect } from 'react';
import M from 'materialize-css';
import running5 from '../assets/running5.jpg';
import running12 from '../assets/running12.jpg';
import running17 from '../assets/running17.jpg';
import running18 from '../assets/running18.jpg';

function Slider() {
  useEffect(() => {
    M.AutoInit();
    handleScrollSpy();
  }, []);

  const handleScrollSpy = () => {
    let elems = document.querySelectorAll('.scrollspy');
    let options = {};
    M.ScrollSpy.init(elems, options);
  };

  return (
    <React.Fragment>
      <section className="section-slider slider">
        <ul className="slides">
          <li>
            <img src={running5} alt="" />
            <div className="caption left-align">
              <h3>Join Us Now!</h3>
              <p
                className="light grey-text text-lighten-3 hide-on-small-only
              "
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>
              <a
                href="#signup"
                className="waves-effect waves-light btn-large grey darken-4"
              >
                Sign Up
              </a>
              <a
                href="#about"
                className="waves-effect waves-dark btn-large cyan accent-3 black-text"
              >
                Learn more
              </a>
            </div>
          </li>
          <li>
            <img src={running12} alt="" />
            <div className="caption left-align">
              <h3 className="black-text">Monitor Your Trainings</h3>
              <p className="black-text hide-on-small-only">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>
              <a
                href="#signup"
                className="btn btn-large grey darken-4 white-text waves-effect waves-light modal-trigger"
              >
                Sign Up
              </a>
              <a
                href="#about"
                className="waves-effect waves-dark btn-large cyan accent-3 black-text"
              >
                Learn more
              </a>
            </div>
          </li>

          <li>
            <img src={running18} alt="" />
            <div className="caption left-align">
              <h3 className="grey-text text-lighten-3">Count kilometers run</h3>
              <p className="light grey-text text-lighten-3 hide-on-small-only">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>
              <a
                href="#signup"
                className="btn btn-large grey darken-4 text-white waves-effect waves-light modal-trigger"
              >
                Sign Up
              </a>
              <a
                href="#about"
                className="waves-effect waves-dark btn-large cyan accent-3 black-text"
              >
                Learn more
              </a>
            </div>
          </li>
          <li>
            <img src={running17} alt="" />
            <div className="caption left-align">
              <h3 className="white-text">Calculate calories burnt</h3>
              <p className="light white-text hide-on-small-only">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>
              <a
                href="#signup"
                className="btn btn-large grey darken-4 text-white waves-effect waves-light modal-trigger"
              >
                Sign Up
              </a>
              <a
                href="#about"
                className="waves-effect waves-dark btn-large cyan accent-3 black-text"
              >
                Learn more
              </a>
            </div>
          </li>
        </ul>
      </section>
      <div className="slider-line grey darken-4"></div>
    </React.Fragment>
  );
}

export default Slider;
