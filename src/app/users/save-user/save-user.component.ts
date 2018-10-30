import {
	Component,
	Output,
	EventEmitter,
	ViewChild,
	Input,
	OnInit
} from '@angular/core';
import { User } from '../model';
import { Subscription } from 'rxjs';

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

	constructor() {}

	ngOnInit() {
		this.isUpdateUser = !!this.user.id;
		console.log('is there id', !!this.user.id);
		console.log('given user:', this.user);
	}

	onSubmit() {
		console.log('ma amcii un cazzo');
	}

	cancel() {
		console.log('cosa?');
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
