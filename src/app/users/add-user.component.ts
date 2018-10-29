import { Component, Output, EventEmitter, ViewChild } from '@angular/core';
import { User } from './model';
import { tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
	selector: 'add-user',
	inputs: [],
	outputs: ['onAddUser'],
	styleUrls: ['./add-user.component.scss'],
	templateUrl: './add-user.component.html'
})
export class AddUserComponent {
	user: User;
	@Output()
	onAddUser: EventEmitter<any> = new EventEmitter(true);
	@ViewChild('addUserForm')
	addUserForm;

	constructor() {
		this.user = new User();
	}

	onSubmit() {
		const _this: AddUserComponent = this;
		const subscription: Subscription = this.onAddUser.subscribe(onSubscribe);
		this.onAddUser.emit(this.user);

		function onSubscribe() {
			_this.cancel();
			subscription.unsubscribe();
		}
	}

	cancel() {
		this.addUserForm.resetForm();
	}
}
