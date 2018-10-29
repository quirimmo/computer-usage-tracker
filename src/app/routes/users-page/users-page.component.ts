import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/users/model';
import { UsersDAOService } from 'src/app/users/dao.service';

@Component({
	selector: 'users-page',
	inputs: [],
	outputs: [],
	templateUrl: './users-page.component.html'
})
export class UsersPageComponent implements OnInit {
	users: User[];

	constructor(
		private route: ActivatedRoute,
		private usersDAO: UsersDAOService
	) {}

	ngOnInit() {
		this.users = this.route.snapshot.data.fetchUsersAction.users;
	}

	deleteUser(user: User): void {
		const subscription = this.usersDAO
			.removeUser(user)
			.subscribe((removedUsers: number) => {
				subscription.unsubscribe();
			});
	}

	updateUser(user: User): void {
		console.log('calling update user callback from app component', user);
	}
}
