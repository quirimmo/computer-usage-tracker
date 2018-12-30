import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../model';
import { Subscription } from 'rxjs';
import { ConfirmCancelDialogService } from '../../utils/confirm-cancel-dialog/confirm-cancel-dialog.service';

@Component({
	selector: 'users-list-item',
	inputs: ['user'],
	outputs: ['onDeleteUser', 'onUpdateUser'],
	styleUrls: ['./users-list-item.component.scss'],
	templateUrl: './users-list-item.component.html'
})
export class UsersListItemComponent {
	@Input()
	user: User;
	@Output()
	onDeleteUser: EventEmitter<any> = new EventEmitter(true);
	@Output()
	onUpdateUser: EventEmitter<any> = new EventEmitter();

	LOGO = require('./bud-spencer.jpg');

	constructor(private confirmCancelDialogService: ConfirmCancelDialogService) {}

	deleteUser(user: User) {
		const _this: UsersListItemComponent = this;
		this.confirmCancelDialogService.open({
			title: 'Remove User',
			text: `Are you sure you want to remove the user ${user.firstName}?`,
			onConfirm
		});

		function onConfirm() {
			const subscription: Subscription = _this.onDeleteUser.subscribe(() =>
				subscription.unsubscribe()
			);
			_this.onDeleteUser.emit(user);
		}
	}

	updateUser(user: User) {
		this.onUpdateUser.emit(user);
	}
}
