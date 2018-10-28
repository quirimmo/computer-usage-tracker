import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from './model';

@Component({
	selector: 'users-list',
	inputs: ['users'],
	outputs: ['onDeleteUser', 'onUpdateUser'],
	styleUrls: ['./users-list.component.scss'],
	templateUrl: './users-list.component.html'
})
export class UsersListComponent implements OnInit {
	@Input()
	users: User[];
	@Output()
	onDeleteUser: EventEmitter<any> = new EventEmitter();
	@Output()
	onUpdateUser: EventEmitter<any> = new EventEmitter();

	constructor() {}

	ngOnInit() {
		// console.log('users:', this.users);
	}

	deleteUser(user: User) {
		this.onDeleteUser.emit(user);
	}

	updateUser(user: User) {
		this.onUpdateUser.emit(user);
	}
}
