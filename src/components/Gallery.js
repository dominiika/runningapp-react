import React, { useEffect } from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css';
import run8 from '../assets/run8.jpg';
import run5 from '../assets/run5.jpg';
import run6 from '../assets/run6.jpg';
import run9 from '../assets/run9.jpg';

function Gallery() {
  useEffect(() => {
    Aos.init({ duration: 3000 });
  }, []);

  return (
    <React.Fragment>
      <section className="section-secondary-header">
        <div className="overlay">
          <div className="container" data-aos="fade">
            <h4 className="white-text center">
              <i className="material-icons small cyan-text text-accent-3 icon-logo">
                directions_run
              </i>
              RunUp is a perfect place for dedicated runners
            </h4>
            <div className="row">
              <div className="col s12 m3">
                <img
                  className="materialboxed responsive-img"
                  src={run8}
                  alt=""
                />
              </div>
              <div className="col s12 m3">
                <img
                  className="materialboxed responsive-img"
                  src={run5}
                  alt=""
                />
              </div>
              <div className="col s12 m3">
                <img
                  className="materialboxed responsive-img"
                  src={run6}
                  alt=""
                />
              </div>
              <div className="col s12 m3">
                <img
                  className="materialboxed responsive-img"
                  src={run9}
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

export default Gallery;
