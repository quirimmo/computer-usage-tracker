import { dispatch } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { User } from './model';
import { Action, Dispatch, AnyAction } from 'redux';
import { Observable, of, Subject } from 'rxjs';
import { map, tap, share, publish } from 'rxjs/operators';
import { NgRedux } from '@angular-redux/store';
import { StoreModel } from '../store/model';
import { UsersDAOService } from './dao.service';

export interface UserAction extends Action {
	users?: User[];
}

@Injectable()
export class UserActions {
	static readonly FETCH_USERS = 'FETCH_USERS';

	constructor(
		private ngRedux: NgRedux<StoreModel>,
		private usersDAOService: UsersDAOService
	) {}

	public dispatchFetchUsersThunk(): Observable<UserAction> {
		return this.fetchUsersThunk()(this.ngRedux.dispatch);
	}

	private fetchUsersThunk(): (
		disp: Dispatch<AnyAction>
	) => Observable<UserAction> {
		return (disp: Dispatch<AnyAction>) =>
			this.fetchUsers().pipe(
				map((users: User[]) => disp(this.fetchUsersFulfilled(users)))
			);
	}

	private fetchUsersFulfilled(users: User[]): UserAction {
		return {
			type: UserActions.FETCH_USERS,
			users
		};
	}

	private fetchUsers(): Observable<User[]> {
		console.log('fetching users');
		return this.usersDAOService.fetchUsers();
		// return of([new User('test user 1'), new User('test user 2')]);
	}
}
