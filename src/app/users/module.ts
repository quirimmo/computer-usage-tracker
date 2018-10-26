import { NgModule } from '@angular/core';
import { UserActions } from './actions';
import { UsersListComponent } from './users-list.component';

@NgModule({
	declarations: [UsersListComponent],
	exports: [UsersListComponent],
	imports: [],
	providers: [UserActions]
})
export class UserModule {}
