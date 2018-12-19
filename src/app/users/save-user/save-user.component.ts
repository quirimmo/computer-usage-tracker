import {
	Component,
	Output,
	EventEmitter,
	ViewChild,
	Input,
	OnInit
} from '@angular/core';
import { AngularFileUploaderComponent } from 'angular-file-uploader';
import { User } from '../model';
import { Router } from '@angular/router';
import { delay, map } from 'rxjs/operators';
import { FilesUploaderTriggerService } from 'src/app/files-uploader/files-uploader-trigger/files-uploader-trigger.service';

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

	@ViewChild('fileUpload1')
	private fileUpload1: AngularFileUploaderComponent;

	uploadedFiles: any = [
		{
			id: '1',
			path: 'file path 1',
			name: 'First File',
			description: 'Description of the first file'
		}
	];

	afuConfig = {
		multiple: true,
		uploadAPI: {
			url: 'https://example-file-upload-api'
		}
	};

	showSuccessMessage: boolean;
	isUpdateUser: boolean;
	submitButtonText: string;
	successMessageText: string;

	constructor(
		private router: Router,
		private filesUploaderTrigger: FilesUploaderTriggerService
	) {}

	ngOnInit() {
		this.isUpdateUser = !!this.user.id;
		this.submitButtonText = this.isUpdateUser ? 'Update User' : 'Add User';
		this.successMessageText = this.isUpdateUser
			? 'User Updated Correctly'
			: 'User Added Correctly';
	}

	onClick() {
		console.log('clicked:', this.fileUpload1);
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

	testOpen() {
		this.filesUploaderTrigger.open();
	}

	cancel() {
		this.router.navigate(['/users-page']);
	}

	reset() {
		this.saveUserForm.resetForm();
	}
}
