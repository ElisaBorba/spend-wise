import { combineReducers } from 'redux';
import userData from './user';
import walletData from './wallet';

const rootReducer = combineReducers({ userData, walletData });

export default rootReducer;
