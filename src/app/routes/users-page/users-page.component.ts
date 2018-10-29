import { Component } from '@angular/core';
import { User } from 'src/app/users/model';
import { UserActions } from 'src/app/users/actions';
import { Observable } from 'rxjs';
import { select } from '@angular-redux/store';

@Component({
	selector: 'users-page',
	inputs: [],
	outputs: [],
	templateUrl: './users-page.component.html'
})
export class UsersPageComponent {
	@select(['users'])
	readonly users$: Observable<User[]>;

	constructor(private actions: UserActions) {}

	deleteUser(user: User): void {
		const subscription = this.actions
			.dispatchRemoveUserThunk(user)
			.subscribe(() => {
				subscription.unsubscribe();
			});
	}

	updateUser(user: User): void {
		console.log('calling update user callback from app component', user);
	}
}
