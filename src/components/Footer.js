import React, { useEffect } from 'react';
import M from 'materialize-css';

function Footer() {
  useEffect(() => {
    M.AutoInit();
    handleScrollSpyInit();
  }, []);

  const handleScrollSpyInit = () => {
    let elems = document.querySelectorAll('.scrollspy');
    let options = {};
    M.ScrollSpy.init(elems, options);
  };
  return (
    <footer className="page-footer grey darken-4 white-text">
      <div className="container">
        <div className="row">
          <div className="col l6 m6 s12">
            <h5 className="white-text">
              <i className="material-icons cyan-text text-accent-3">
                directions_run
              </i>
              RunUp
            </h5>
            <p className="grey-text text-lighten-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto
              doloremque quibusdam harum ipsum esse praesentium eum, eligendi,
              minus optio cumque cupiditate nostrum sunt? Error, illum.
            </p>
          </div>
          <div className="col l4 offset-l2 m5 offset-m1 s8 offset-s4">
            <h5 className="white-text find-me">Find me</h5>
            <a href="https://github.com/dominiika/" target="blank_">
              <i className="fab fa-github small"></i>
            </a>
            <a
              href="https://www.linkedin.com/in/dominika-gajda-483910194/"
              target="blank_"
            >
              <i className="fab fa-linkedin-in small"></i>
            </a>
            <a href="mailto:dominika.gajda@gmail.com">
              <i className="far fa-envelope small"></i>
            </a>
          </div>
        </div>
      </div>
      <div className="footer-copyright">
        <div className="container">
          © 2020 Dominika Gajda
          <a className="right" href="#home">
            <i className="material-icons grey-text text-lighten-4">
              arrow_upward
            </i>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
