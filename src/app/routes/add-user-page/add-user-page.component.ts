import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/users/model';
import { UserActions } from 'src/app/users/actions';
import { ActivatedRoute } from '@angular/router';
import { RouteDataService } from '../route-data-service.service';

@Component({
	selector: 'add-user-page',
	inputs: [],
	outputs: [],
	templateUrl: './add-user-page.component.html'
})
export class AddUserPageComponent implements OnInit {
	public user: User;

	constructor(private actions: UserActions) {}

	ngOnInit() {
		this.user = new User();
	}

	saveUser(user: User) {
		const subscription = this.actions
			.dispatchAddUserThunk(user)
			.subscribe(onSubscribe);

		function onSubscribe() {
			subscription.unsubscribe();
		}
	}
}
