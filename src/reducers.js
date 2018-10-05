import { combineReducers } from 'redux';
import { ADD_CONTACT } from './actions';

const contact = (state = [], action) => {
  switch (action.type) {
  case ADD_CONTACT:
    return [
      ...state,
      action
    ];
  }
};

const resumeApp = combineReducers({ contact });

export default resumeApp;