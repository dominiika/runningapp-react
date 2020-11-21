import React from 'react';
import { withRouter } from 'react-router-dom';
import 'materialize-css/dist/css/materialize.min.css';
import { withCookies } from 'react-cookie';
import { Route, Switch } from 'react-router-dom';
import HomePage from './HomePage';
import Navbar from './Navbar';
import Footer from './Footer';
import Test from './Test';
import TrainingsList from './TrainingsList';
import TrainingDetail from './TrainingDetail';

function App(props) {
  return (
    <React.Fragment>
      <Navbar cookies={props.cookies} />
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <HomePage
              cookies={props.cookies}
              {...props}
              things={props.things}
            />
          )}
        />
        <Route path="/test" render={() => <Test />} />
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

export default withCookies(withRouter(App));
