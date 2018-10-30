import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserModule } from 'src/app/users/module';
import { SaveUserPageComponent } from './save-user-page.component';
import { RouterModule } from '@angular/router';

@NgModule({
	declarations: [SaveUserPageComponent],
	imports: [CommonModule, UserModule, RouterModule],
	providers: [SaveUserPageComponent],
	bootstrap: []
})
export class SaveUserPageRouteModule {}
