import React from 'react';
import { Link, withRouter } from 'react-router-dom';

function Training(props) {
  return (
    <div>
      <img src="images/yuna.jpg" alt="" className="circle" />
      <Link to={`/trainings/${props.training.id}`}>
        <h5 className="">{props.training.name}</h5>
      </Link>
      <p>
        {props.training.distance} km <br />
        {props.training.calories} calories burnt <br />
        {props.training.time_in_seconds / 60} minutes <br />
        {props.training.avg_tempo} km/h on average <br />
        {props.training.date} <br />
      </p>
      <Link
        to={`/trainings/${props.training.id}`}
        className="secondary-content"
      >
        {/* <a href="#!" className="secondary-content"> */}
        See more details
        <i
          style={{ paddingLeft: '5px' }}
          className="fas fa-angle-double-right"
        ></i>
        {/* </a> */}
      </Link>
    </div>
  );
}

export default Training;
