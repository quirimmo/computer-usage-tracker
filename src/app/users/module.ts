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
import { AddUserComponent } from './add-user/add-user.component';
import { SaveUserComponent } from './save-user/save-user.component';

@NgModule({
	declarations: [UsersListComponent, AddUserComponent, SaveUserComponent],
	exports: [UsersListComponent, AddUserComponent, SaveUserComponent],
	imports: [
		ElectronProxyModule,
		CommonModule,
		MatFormFieldModule,
		MatInputModule,
		MatButtonModule,
		MatListModule,
		MatIconModule,
		FormsModule,
		ConfirmCancelDialogModule
	],
	providers: [UserActions, UsersDAOService]
})
export class UserModule {}
