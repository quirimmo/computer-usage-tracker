import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersPageComponent } from './users-page.component';
import { UserModule } from 'src/app/users/module';

@NgModule({
	declarations: [UsersPageComponent],
	imports: [CommonModule, UserModule],
	providers: [UsersPageComponent],
	bootstrap: []
})
export class UsersPageRouteModule {}
