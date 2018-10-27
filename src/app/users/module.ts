import { NgModule } from '@angular/core';
import { UserActions } from './actions';
import { UsersListComponent } from './users-list.component';
import { UsersDAOService } from './dao.service';
import { ElectronProxyModule } from '../electron-proxy/module';

@NgModule({
	declarations: [UsersListComponent],
	exports: [UsersListComponent],
	imports: [ElectronProxyModule],
	providers: [UserActions, UsersDAOService]
})
export class UserModule {}
