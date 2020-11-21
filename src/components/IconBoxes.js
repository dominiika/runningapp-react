import React, { useEffect } from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css';

function IconBoxes() {
  useEffect(() => {
    Aos.init({ duration: 3000 });
  }, []);
  // cyan accent-3 grey-text text-darken-4
  return (
    <section className="section-icon-boxes">
      <div className="container">
        <div data-aos="fade" className="row">
          <div className="col s12 m4">
            <div className="card-panel center z-depth-3 grey darken-4 white-text">
              <i className="fas fa-map-marked-alt medium cyan-text text-accent-3"></i>

              <h5>Track your trainings</h5>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa,
                accusantium!
              </p>
            </div>
          </div>
          <div className="col s12 m4">
            <div className="card-panel center z-depth-3 cyan accent-3 grey-text text-darken-4">
              <i className="fas fa-running medium"></i>
              <h5>See your progress</h5>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa,
                accusantium!
              </p>
            </div>
          </div>
          <div className="col s12 m4">
            <div className="card-panel center z-depth-3 grey darken-4 white-text">
              <i className="fas fa-calculator medium cyan-text text-accent-3"></i>

              <h5>Calculate your BMI</h5>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa,
                accusantium!
              </p>
            </div>
          </div>
        </div>
        <div className="divider"></div>
      </div>
    </section>
  );
}

export default IconBoxes;
