import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserActions } from './actions';
import { UsersListComponent } from './users-list.component';
import { UsersDAOService } from './dao.service';
import { ElectronProxyModule } from '../electron-proxy/module';
import {
	MatButtonModule,
	MatListModule,
	MatIconModule
} from '@angular/material';

@NgModule({
	declarations: [UsersListComponent],
	exports: [UsersListComponent],
	imports: [
		ElectronProxyModule,
		CommonModule,
		MatButtonModule,
		MatListModule,
		MatIconModule
	],
	providers: [UserActions, UsersDAOService]
})
export class UserModule {}
