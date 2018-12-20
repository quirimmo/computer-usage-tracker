import { composeReducers, defaultFormReducer } from '@angular-redux/form';
import { combineReducers } from 'redux';
import { userReducer } from '../users/reducer';
import { currentUsageReducer } from '../current-usage/reducer';

export const StoreReducer = composeReducers(
	defaultFormReducer(),
	combineReducers({
		users: userReducer,
		currentUsageTime: currentUsageReducer
	})
);
