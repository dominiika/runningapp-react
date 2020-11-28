import React, { useContext } from 'react';
import { Context } from '../Store';
import { withRouter } from 'react-router';

function DeleteTraining(props) {
  const [globalState, setGlobalState] = useContext(Context);

  const deleteTraining = () => {
    fetch(`http://127.0.0.1:5000/trainings/${props.training.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${props.cookies.get('token')}`,
      },
    });
    setGlobalState({ didLogIn: false, didLogOut: false, refetch: true });
    closeModal();
    props.history.push('/trainings');
  };

  const closeModal = () => {
    document.getElementById('delete-training').M_Modal.close();
  };

  return (
    <div id="delete-training" className="modal">
      <div className="modal-content">
        <h4>Delete {props.training.name}</h4>
        <p>Are you sure you want to delete this training?</p>
      </div>
      <div className="modal-footer">
        <button
          type="submit"
          onClick={deleteTraining}
          className="btn red darken-2 waves-effect waves-dark black-text"
        >
          Yes
        </button>
        <button
          className="btn blue lighten-4 waves-effect waves-dark black-text"
          onClick={closeModal}
        >
          No
        </button>
      </div>
    </div>
  );
}

export default withRouter(DeleteTraining);
