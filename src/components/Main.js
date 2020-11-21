import React, { useEffect, useContext } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import { Route, Switch } from 'react-router-dom';
import HomePage from './HomePage';
import Navbar from './Navbar';
import Footer from './Footer';
import TrainingsList from './TrainingsList';
import TrainingDetail from './TrainingDetail';

function Main(props) {
  console.log('cookies', props.cookies);

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
      </Switch>
      <Footer />
    </React.Fragment>
  );
}

export default Main;
