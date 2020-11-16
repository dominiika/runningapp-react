import { combineReducers } from 'redux';

// to ma odpytywac API:
let _things = ['thing1', 'things'];

function things(state = _things, action) {
  switch (action.type) {
    case 'ADD_THING':
      return [...state, action.thing];
    default:
      return state;
  }
}

const rootReducer = combineReducers({ things });

export default rootReducer;
