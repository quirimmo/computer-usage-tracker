import {
	Component,
	Output,
	EventEmitter,
	ViewChild,
	Input,
	OnInit
} from '@angular/core';
import { User } from '../model';
import { Router } from '@angular/router';
import { concat, defer, Observable, Subject } from 'rxjs';
import { delay, mapTo, map } from 'rxjs/operators';

@Component({
	selector: 'save-user',
	inputs: ['user'],
	outputs: ['onSaveUser'],
	styleUrls: ['./save-user.component.scss'],
	templateUrl: './save-user.component.html'
})
export class SaveUserComponent implements OnInit {
	@Input()
	user?: User;

	@Output()
	onSaveUser: EventEmitter<any> = new EventEmitter(true);

	@ViewChild('saveUserForm')
	saveUserForm;

	showSuccessMessage: boolean;
	isUpdateUser: boolean;
	submitButtonText: string;
	successMessageText: string;

	constructor(private router: Router) {}

	ngOnInit() {
		this.isUpdateUser = !!this.user.id;
		this.submitButtonText = this.isUpdateUser ? 'Update User' : 'Add User';
		this.successMessageText = this.isUpdateUser
			? 'User Updated Correctly'
			: 'User Added Correctly';
	}

	onSubmit() {
		const _this: SaveUserComponent = this;
		const subscription = this.onSaveUser
			.pipe(map(showSuccessMessage))
			.pipe(delay(2000))
			.subscribe(onSubscribe);
		this.onSaveUser.emit(this.user);

		function showSuccessMessage() {
			_this.showSuccessMessage = true;
		}

		function onSubscribe() {
			_this.showSuccessMessage = false;
			if (!_this.isUpdateUser) {
				_this.reset();
			}
			subscription.unsubscribe();
		}
	}

	cancel() {
		this.router.navigate(['/users-page']);
	}

	reset() {
		this.saveUserForm.resetForm();
	}
}
