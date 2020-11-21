import React, { useEffect } from 'react';
import shoes from '../assets/shoes.jpg';
import Aos from 'aos';
import 'aos/dist/aos.css';

function About() {
  useEffect(() => {
    Aos.init({ duration: 3000 });
  }, []);

  return (
    <section id="about" className="section-about scrollspy">
      <div className="container">
        <div className="row cyan accent-3" data-aos="fade">
          <div className="col s12 m6">
            <img src={shoes} className=" responsive-img" alt="" />
          </div>
          <div className="col s12 m6">
            <h3>About RunUp</h3>
            <p className="flow-text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam,
              voluptatem tempore porro officia et eos pariatur ducimus iure
              sapiente nobis nisi rerum reprehenderit animi beatae iusto eaque
              nesciunt omnis quae dicta, ut ad sunt. Eveniet, voluptatibus!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
