import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from './model';
import { Subscription } from 'rxjs';

@Component({
	selector: 'users-list',
	inputs: ['users'],
	outputs: ['onDeleteUser', 'onUpdateUser'],
	styleUrls: ['./users-list.component.scss'],
	templateUrl: './users-list.component.html'
})
export class UsersListComponent {
	@Input()
	users: User[];
	@Output()
	onDeleteUser: EventEmitter<any> = new EventEmitter(true);
	@Output()
	onUpdateUser: EventEmitter<any> = new EventEmitter();

	constructor() {}

	deleteUser(user: User) {
		const subscription: Subscription = this.onDeleteUser.subscribe(onSubscribe);
		this.onDeleteUser.emit(user);

		function onSubscribe() {
			subscription.unsubscribe();
		}
	}

	updateUser(user: User) {
		this.onUpdateUser.emit(user);
	}
}
