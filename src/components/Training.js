import React from 'react';
import { Link } from 'react-router-dom';

function Training(props) {
  return (
    <div className="training">
      <img src="images/yuna.jpg" alt="" className="circle" />
      <Link to={`/trainings/${props.training.id}`} className="training-name">
        <h5 className="training-name">{props.training.name}</h5>
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
          <i className="fas fa-times red-text small secondary-content delete-training"></i>
          <br />
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
