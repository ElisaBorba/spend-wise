import { AnyAction } from 'redux';
import { REQUEST_STARTED,
  REQUEST_SUCCESSFUL,
  REQUEST_FAILED,
  ADD_EXPENSE,
  DELETE_EXPENSE } from '../actions/index';

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
    case ADD_EXPENSE: {
      return {
        ...state,
        isFetching: false,
        expenses: [...state.expenses, action.payload],
      };
    }
    case DELETE_EXPENSE: {
      return {
        ...state,
        isFetching: false,
        expenses: action.payload,
      };
    }

    default:
      return state;
  }
};

export default wallet;
