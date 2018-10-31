import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserModule } from 'src/app/users/module';
import { AddUserPageComponent } from './add-user-page.component';

@NgModule({
	declarations: [AddUserPageComponent],
	imports: [CommonModule, UserModule],
	providers: [AddUserPageComponent],
	bootstrap: []
})
export class AddUserPageRouteModule {}
