import React, { useContext } from 'react';
import { Context } from '../Store';

function Logout(props) {
  const [globalState, setGlobalState] = useContext(Context);

  const handleLogOut = () => {
    fetch('http://127.0.0.1:5000/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: props.cookies.get('token'),
      },
    })
      .then(setGlobalState({ refetch: true }))
      .catch((err) => console.log(err));
    let path = '/';
    props.cookies.remove('token', {
      path: path,
      secure: true,
    });
    props.cookies.remove('user', {
      path: path,
      secure: true,
    });
    props.cookies.remove('username', {
      path: path,
      secure: true,
    });
  };

  return (
    <li>
      {props.mobile ? (
        <a href="#" onClick={handleLogOut} className="modal-trigger">
          Log out
        </a>
      ) : (
        <a onClick={handleLogOut}>Log out</a>
      )}
    </li>
  );
}

export default Logout;
