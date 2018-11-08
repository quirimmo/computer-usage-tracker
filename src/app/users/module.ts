import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserActions } from './actions';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersDAOService } from './dao.service';
import { ElectronProxyModule } from '../electron-proxy/module';
import { FormsModule } from '@angular/forms';
import {
	MatButtonModule,
	MatListModule,
	MatIconModule,
	MatInputModule,
	MatFormFieldModule
} from '@angular/material';
import { ConfirmCancelDialogModule } from '../utils/confirm-cancel-dialog/confirm-cancel-dialog.module';
import { SaveUserComponent } from './save-user/save-user.component';
import { FilesUploaderModule } from '../files-uploader/files-uploader.module';

@NgModule({
	declarations: [UsersListComponent, SaveUserComponent],
	exports: [UsersListComponent, SaveUserComponent],
	imports: [
		ElectronProxyModule,
		CommonModule,
		MatFormFieldModule,
		MatInputModule,
		MatButtonModule,
		MatListModule,
		MatIconModule,
		FormsModule,
		ConfirmCancelDialogModule,
		FilesUploaderModule
	],
	providers: [UserActions, UsersDAOService]
})
export class UserModule {}
