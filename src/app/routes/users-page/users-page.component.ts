import { Component } from '@angular/core';
import { User } from 'src/app/users/model';
import { UserActions } from 'src/app/users/actions';
import { Observable } from 'rxjs';
import { select } from '@angular-redux/store';
import { Router } from '@angular/router';
import { RouteDataService } from '../route-data-service.service';

@Component({
	selector: 'users-page',
	inputs: [],
	outputs: [],
	templateUrl: './users-page.component.html'
})
export class UsersPageComponent {
	@select(['users'])
	readonly users$: Observable<User[]>;

	constructor(
		private actions: UserActions,
		private router: Router,
		private routeDataService: RouteDataService
	) {}

	deleteUser(user: User): void {
		const subscription = this.actions
			.dispatchRemoveUserThunk(user)
			.subscribe(() => {
				subscription.unsubscribe();
			});
	}

	updateUser(user: User): void {
		this.routeDataService.currentUser = user;
		this.router.navigate(['/save-user-page']);
	}
}
