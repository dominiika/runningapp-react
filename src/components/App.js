import { withRouter } from 'react-router-dom';
import 'materialize-css/dist/css/materialize.min.css';

import { withCookies } from 'react-cookie';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../redux/actions';
import Main from './Main';

function mapStateToProps(state) {
  return {
    things: state.things,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

const App = withCookies(
  withRouter(connect(mapStateToProps, mapDispatchToProps)(Main))
);

export default App;
