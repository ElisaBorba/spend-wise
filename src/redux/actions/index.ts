import { UserData, Dispatch, ExpenseValues } from '../../types';
import { fetchCurrency } from '../../services/currenciesAPI';

export const SUBMIT_USER_DATA = 'SUBMIT_USER_DATA';

export const REQUEST_STARTED = 'REQUEST_STARTED';
export const REQUEST_SUCCESSFUL = 'REQUEST_SUCCESSFUL';
export const REQUEST_FAILED = 'REQUEST_FAILED';

export const ADD_EXPENSE = 'ADD_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';

// ACTIONS DE USER

export const submitUserData = (user: UserData) => ({
  type: SUBMIT_USER_DATA,
  payload: user.email,
});

// ACTIONS DE WALLET

function requestStarted() {
  return { type: REQUEST_STARTED };
}

function requestSuccessful(currencies: string[]) {
  return {
    type: REQUEST_SUCCESSFUL,
    payload: currencies,
  };
}

function requestFailed(error: string) {
  return { type: REQUEST_FAILED, payload: error };
}

export function fetchAPI() {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(requestStarted());
      const dataApi = await fetchCurrency();
      const dataArrayApi = Object.keys(dataApi);
      dispatch(requestSuccessful(dataArrayApi));
    } catch (error: any) {
      dispatch(requestFailed(error.message));
    }
  };
}

// ACTIONS DAS EXPENSES

export const submitExpensesValues = (expenses: ExpenseValues[]) => ({
  type: ADD_EXPENSE,
  payload: expenses,
});

export function fetchExpensesAPI(expenses: any) {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(requestStarted());
      const dataApi = await fetchCurrency();
      const newExpense = {
        ...expenses,
        exchangeRates: await dataApi,
      };
      dispatch(submitExpensesValues(newExpense));
    } catch (error: any) {
      dispatch(requestFailed(error.message));
    }
  };
}

export const deleteExpense = (expenses: ExpenseValues[]) => ({
  type: DELETE_EXPENSE,
  payload: expenses,
});

export const editExpense = (expenses: ExpenseValues[]) => ({
  type: EDIT_EXPENSE,
  payload: expenses,
  // editor:
});
