import React from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import { Route, Switch } from 'react-router-dom';
import HomePage from './HomePage';
import Navbar from './Navbar';
import Footer from './Footer';
import TrainingsList from './TrainingsList';
import TrainingDetail from './TrainingDetail';
import UserProfile from './UserProfile';

function Main(props) {
  return (
    <React.Fragment>
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
        <Route
          exact
          path="/profile"
          render={(params) => (
            <UserProfile {...params} cookies={props.cookies} />
          )}
        />
      </Switch>
      <Footer />
    </React.Fragment>
  );
}

export default Main;
