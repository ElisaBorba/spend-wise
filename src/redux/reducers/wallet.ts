import { AnyAction } from 'redux';
import { REQUEST_STARTED,
  REQUEST_SUCCESSFUL,
  REQUEST_FAILED,
  EXPENSES_DATA } from '../actions/index';

const INITIAL_STATE = {
  isFetching: false,
  currencies: [],
  errorMessage: '',
  expenses: [],
  editor: false,
  idToEdit: 0,
  exchangeRates: {},
};

const wallet = (state = INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    case REQUEST_STARTED: {
      return {
        ...state,
        isFetching: true,
      };
    }
    case REQUEST_SUCCESSFUL: {
      return {
        ...state,
        isFetching: false,
        currencies: action.payload,
      };
    }
    case REQUEST_FAILED: {
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      };
    }
    case EXPENSES_DATA: {
      return {
        ...state,
        isFetching: false,
        expenses: [...state.expenses, action.payload],
      };
    }
    default:
      return state;
  }
};

export default wallet;
