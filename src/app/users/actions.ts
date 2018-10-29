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
	static readonly ADD_USER = 'ADD_USER';
	static readonly REMOVE_USER = 'REMOVE_USER';

	constructor(
		private ngRedux: NgRedux<StoreModel>,
		private usersDAOService: UsersDAOService
	) {}

	// FETCH
	// ==============================

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
		return this.usersDAOService.fetchUsers();
	}

	// ADD
	// ==============================

	public dispatchAddUserThunk(user: User): Observable<UserAction> {
		return this.addUserThunk(user)(this.ngRedux.dispatch);
	}

	private addUserThunk(
		user: User
	): (disp: Dispatch<AnyAction>) => Observable<UserAction> {
		return (disp: Dispatch<AnyAction>) =>
			this.addUser(user).pipe(
				map((users: User[]) => disp(this.addUserFulfilled(users)))
			);
	}

	private addUserFulfilled(users: User[]): UserAction {
		return {
			type: UserActions.ADD_USER,
			users
		};
	}

	private addUser(user: User): Observable<User[]> {
		return this.usersDAOService.addUser(user);
	}

	// REMOVE
	// ==============================

	public dispatchRemoveUserThunk(user: User): Observable<UserAction> {
		return this.removeUserThunk(user)(this.ngRedux.dispatch);
	}

	private removeUserThunk(
		user: User
	): (disp: Dispatch<AnyAction>) => Observable<UserAction> {
		return (disp: Dispatch<AnyAction>) =>
			this.removeUser(user).pipe(
				map((removedUsers: number) => disp(this.removeUserFulfilled([user])))
			);
	}

	private removeUserFulfilled(users: User[]): UserAction {
		console.log('remove user fulfilled');
		return {
			type: UserActions.REMOVE_USER,
			users
		};
	}

	private removeUser(user: User): Observable<number> {
		return this.usersDAOService.removeUser(user);
	}
}
