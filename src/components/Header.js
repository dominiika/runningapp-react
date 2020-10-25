import React from 'react';

function Header(props) {
  return (
    <div className="section-header">
      <div className="primary-overlay">
        <div className="container white-text">
          <h3 className="vertical-center center">{props.title}</h3>
        </div>
      </div>
    </div>
  );
}

export default Header;
