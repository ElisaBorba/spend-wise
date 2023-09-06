import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

export type UserData = {
  email: string,
};

export type GlobalState = {
  user: UserData,
  wallet: WalletState,
};

export type WalletState = {
  isFetching: boolean,
  currencies: string[],
  errorMessage: string,
  expenses: ExpenseValues[],
  editor: boolean,
  idToEdit: number,
  exchangeRates: Currencies,
};

export type ExpenseValues = {
  id: number;
  value: string;
  description: string;
  currency: string;
  method: string;
  tag: string;
  exchangeRates?: any,
};

export type Currency = {
  code: string;
  codein: string;
  name: string;
  high: string;
  low: string;
  varBid: string;
  pctChange: string;
  bid: string;
  ask: string;
  timestamp: string;
  create_date:string;
};

export type Currencies = {
  USD: Currency;
  CAD: Currency;
  GBP: Currency;
  ARS: Currency;
  BTC: Currency;
  LTC: Currency;
  EUR: Currency;
  JPY: Currency;
  CHF: Currency;
  AUD: Currency;
  CNY: Currency;
  ILS: Currency;
  ETH: Currency;
  XRP: Currency;
  DOGE: Currency;
};

export type Dispatch = ThunkDispatch<GlobalState, null, AnyAction>;
