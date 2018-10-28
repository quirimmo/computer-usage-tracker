import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/users/model';

@Component({
	selector: 'users-page',
	inputs: [],
	outputs: [],
	templateUrl: './users-page.component.html'
})
export class UsersPageComponent implements OnInit {
	users: User[];

	constructor(private route: ActivatedRoute) {}

	ngOnInit() {
		this.users = this.route.snapshot.data.fetchUsersAction.users;
	}

	deleteUser(user: User): void {
		console.log('calling delete user callback from app component', user);
	}

	updateUser(user: User): void {
		console.log('calling update user callback from app component', user);
	}
}
