import { dispatch } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { User } from './model';
import { Action } from 'redux';

export interface UserAction extends Action {
	users?: User[];
}

@Injectable()
export class UserActions {
	static readonly FETCH_USERS = 'FETCH_USERS';

	@dispatch()
	public fetchUsers(): UserAction {
		return {
			type: UserActions.FETCH_USERS,
			users: [new User('Quirino'), new User('Pelota')]
		};
	}
}
