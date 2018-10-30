import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/users/model';
import { UserActions } from 'src/app/users/actions';
import { ActivatedRoute } from '@angular/router';
import { RouteDataService } from '../route-data-service.service';

@Component({
	selector: 'save-user-page',
	inputs: [],
	outputs: [],
	templateUrl: './save-user-page.component.html'
})
export class SaveUserPageComponent implements OnInit {
	public user?: User;

	constructor(
		private actions: UserActions,
		private routeDataService: RouteDataService
	) {}

	ngOnInit() {
		this.user = this.routeDataService.currentUser
			? this.routeDataService.currentUser
			: new User();
	}

	saveUser(user: User) {
		const subscription = user.id
			? this.actions.dispatchUpdateUserThunk(user).subscribe(onSubscribe)
			: this.actions.dispatchAddUserThunk(user).subscribe(onSubscribe);

		function onSubscribe() {
			subscription.unsubscribe();
		}
	}
}
