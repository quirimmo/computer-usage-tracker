import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { UserActions } from '../users/actions';

@Injectable()
export class UsersResolver implements Resolve<Observable<any>> {
	constructor(private actions: UserActions) {}

	resolve() {
		return this.actions.dispatchFetchUsersThunk();
	}
}
