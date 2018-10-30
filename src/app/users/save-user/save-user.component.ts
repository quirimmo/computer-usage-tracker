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
	showSuccessMessage: boolean;
	isUpdateUser: boolean;

	@Output()
	onSaveUser: EventEmitter<any> = new EventEmitter(true);
	@ViewChild('saveUserForm')
	saveUserForm;

	constructor(private router: Router) {}

	ngOnInit() {
		this.isUpdateUser = !!this.user.id;
	}

	onSubmit() {
		const _this: SaveUserComponent = this;
		const subscription = this.onSaveUser.subscribe(onSubscribe);
		this.onSaveUser.emit(this.user);

		function onSubscribe() {
			_this.showSuccessMessage = true;
			_this.reset();
			subscription.unsubscribe();
			setTimeout(() => {
				_this.showSuccessMessage = false;
			}, 2000);
		}
	}

	cancel() {
		this.router.navigate(['/users-page']);
	}

	reset() {
		this.saveUserForm.resetForm();
	}

	// onSubmit() {
	// 	const _this: AddUserComponent = this;
	// 	const subscription: Subscription = this.onAddUser.subscribe(onSubscribe);
	// 	this.onAddUser.emit(this.user);

	// 	function onSubscribe() {
	// 		_this.showSuccessMessage = true;
	// 		_this.cancel();
	// 		subscription.unsubscribe();
	// 		setTimeout(() => {
	// 			_this.showSuccessMessage = false;
	// 		}, 2000);
	// 	}
	// }

	// cancel() {
	// 	this.addUserForm.resetForm();
	// }
}
