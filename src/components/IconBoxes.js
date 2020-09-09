import React, { useEffect } from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css';

function IconBoxes() {
  useEffect(() => {
    Aos.init({ duration: 3000 });
  }, []);

  return (
    <section className="section-icon-boxes">
      <div className="container">
        <div data-aos="fade" className="row">
          <div className="col s12 m4">
            <div className="card-panel center z-depth-3">
              <i className="fas fa-map-marked-alt medium"></i>

              <h5>Track your trainings</h5>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa,
                accusantium!
              </p>
            </div>
          </div>
          <div className="col s12 m4">
            <div className="card-panel center z-depth-3">
              <i className="fas fa-running medium"></i>
              <h5>See your progress</h5>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa,
                accusantium!
              </p>
            </div>
          </div>
          <div className="col s12 m4">
            <div className="card-panel center z-depth-3">
              <i className="fas fa-calculator medium"></i>

              <h5>Calculate your BMI</h5>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa,
                accusantium!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default IconBoxes;
