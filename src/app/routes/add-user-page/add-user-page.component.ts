import { Component } from '@angular/core';
import { User } from 'src/app/users/model';
import { UsersDAOService } from 'src/app/users/dao.service';

@Component({
	selector: 'add-user-page',
	inputs: [],
	outputs: [],
	templateUrl: './add-user-page.component.html'
})
export class AddUserPageComponent {
	constructor(private usersDAO: UsersDAOService) {}

	addUser(user: User) {
		const subscription = this.usersDAO
			.addUser(user)
			.subscribe((users: User[]) => {
				subscription.unsubscribe();
			});
	}
}
