import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddUserPageComponent } from './add-user-page.component';
import { UserModule } from 'src/app/users/module';

@NgModule({
	declarations: [AddUserPageComponent],
	imports: [CommonModule, UserModule],
	providers: [AddUserPageComponent],
	bootstrap: []
})
export class AddUserPageRouteModule {}
