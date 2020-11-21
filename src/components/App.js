import React from 'react';
import { withCookies } from 'react-cookie';
import { withRouter } from 'react-router-dom';
import Store from '../Store';
import Main from './Main';

function App(props) {
  return (
    <Store>
      <Main cookies={props.cookies} />
    </Store>
  );
}

export default withCookies(withRouter(App));
