import { NgModule } from '@angular/core';
import { UsersPageRouteModule } from './users-page/users-page.module';
import { HomePageRouteModule } from './home-page/home-page.module';
import { AddUserPageRouteModule } from './add-user-page/add-user-page.module';

@NgModule({
	declarations: [],
	imports: [HomePageRouteModule, AddUserPageRouteModule, UsersPageRouteModule],
	providers: [],
	bootstrap: []
})
export class RoutesModule {}
