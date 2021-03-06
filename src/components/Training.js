import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import M from 'materialize-css';

function Training(props) {
  useEffect(() => {
    M.AutoInit();
    handleModalInit();
  }, []);

  const handleModalInit = () => {
    let options = {};
    let elems = document.querySelectorAll('.modal');
    M.Modal.init(elems, options);
  };

  return (
    <div className="training">
      <img src="images/yuna.jpg" alt="" className="circle" />
      <Link to={`/trainings/${props.training.id}`} className="training-name">
        <h5 className="training-name grey-text text-darken-4">
          {props.training.name.toUpperCase()}
        </h5>
      </Link>
      <div className="row">
        <div className="col s10">
          <p className="bolder-text">
            {props.training.distance} km <br />
            {props.training.calories} calories burnt <br />
            {props.training.time_in_seconds / 60} minutes <br />
            {props.training.avg_tempo} km/h on average <br />
            {props.training.date} <br />
          </p>
        </div>
        <div className="col s2">
          <Link to={`/trainings/${props.training.id}`} className="more-details">
            See more details
            <i
              style={{ paddingLeft: '5px' }}
              className="fas fa-angle-double-right"
            ></i>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Training;
