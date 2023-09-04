import { AnyAction } from 'redux';
import { SUBMIT_USER_DATA } from '../actions/index';

const INITIAL_STATE = {
  email: '',
  password: '',
};

const userData = (state = INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    case SUBMIT_USER_DATA: {
      return {
        ...state,
        email: action.payload,
      };
    }
    default:
      return state;
  }
};

export default userData;
