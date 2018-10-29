import { Component } from '@angular/core';
import { User } from 'src/app/users/model';
import { UserActions } from 'src/app/users/actions';

@Component({
	selector: 'add-user-page',
	inputs: [],
	outputs: [],
	templateUrl: './add-user-page.component.html'
})
export class AddUserPageComponent {
	constructor(private actions: UserActions) {}

	addUser(user: User) {
		this.actions.dispatchAddUserThunk(user).subscribe();
	}
}
