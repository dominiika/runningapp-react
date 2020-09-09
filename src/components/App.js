import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import 'materialize-css/dist/css/materialize.min.css';
import HomePage from './HomePage';
import Navbar from './Navbar';
import Footer from './Footer';
import Test from './Test';

function App() {
  return (
    <React.Fragment>
      <Navbar />
      <Switch>
        <Route exact path="/" render={() => <HomePage />} />
        <Route path="/test" render={() => <Test />} />
      </Switch>
      <Footer />
    </React.Fragment>
  );
}

export default withRouter(App);
