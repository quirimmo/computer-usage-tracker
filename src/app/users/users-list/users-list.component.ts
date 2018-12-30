import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../model';
import { Subscription } from 'rxjs';
import { ConfirmCancelDialogService } from '../../utils/confirm-cancel-dialog/confirm-cancel-dialog.service';

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

	constructor(private confirmCancelDialogService: ConfirmCancelDialogService) {}

	deleteUser(user: User) {
		const subscription: Subscription = this.onDeleteUser.subscribe(() =>
			subscription.unsubscribe()
		);
		this.onDeleteUser.emit(user);
	}

	updateUser(user: User) {
		this.onUpdateUser.emit(user);
	}
}
