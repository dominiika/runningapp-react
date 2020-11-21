import React from 'react';
import { withRouter } from 'react-router-dom';
import 'materialize-css/dist/css/materialize.min.css';
import { withCookies } from 'react-cookie';
import { Route, Switch } from 'react-router-dom';
import HomePage from './HomePage';
import Navbar from './Navbar';
import Footer from './Footer';
import TrainingsList from './TrainingsList';
import TrainingDetail from './TrainingDetail';
import Store from '../Store';

function App(props) {
  return (
    <Store>
      <Navbar cookies={props.cookies} />
      <Switch>
        <Route
          exact
          path="/"
          render={() => <HomePage cookies={props.cookies} />}
        />
        <Route
          exact
          path="/trainings"
          render={() => <TrainingsList cookies={props.cookies} />}
        />
        <Route
          exact
          path="/trainings/:id"
          render={(params) => (
            <TrainingDetail {...params} cookies={props.cookies} />
          )}
        />
      </Switch>
      <Footer />
    </Store>
  );
}

export default withCookies(withRouter(App));
