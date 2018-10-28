import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersPageComponent } from './users-page.component';

@NgModule({
	declarations: [UsersPageComponent],
	imports: [CommonModule],
	providers: [UsersPageComponent],
	bootstrap: []
})
export class UsersPageRouteModule {}
