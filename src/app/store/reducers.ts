import { composeReducers, defaultFormReducer } from '@angular-redux/form';
import { combineReducers } from 'redux';
import { Action } from 'redux';
import { User } from '../models/User';

export const StoreReducer = composeReducers(
	defaultFormReducer(),
	combineReducers({
		items: function(state: User[] = [], action: Action) {
			switch (action.type) {
				default:
					return state;
			}
		}
	})
);
