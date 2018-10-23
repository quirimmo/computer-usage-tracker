import { composeReducers, defaultFormReducer } from '@angular-redux/form';
import { combineReducers } from 'redux';
import { userReducer } from '../users/reducer';

export const StoreReducer = composeReducers(
	defaultFormReducer(),
	combineReducers({
		users: userReducer
	})
);
