import { NgModule } from '@angular/core';
import { UsersPageRouteModule } from './users-page/users-page.module';
import { HomePageRouteModule } from './home-page/home-page.module';
import { SaveUserPageRouteModule } from './save-user-page/save-user-page.module';
import { RouteDataService } from './route-data-service.service';
import { AddUserPageRouteModule } from './add-user-page/add-user-page.module';

@NgModule({
	declarations: [],
	imports: [
		HomePageRouteModule,
		UsersPageRouteModule,
		SaveUserPageRouteModule,
		AddUserPageRouteModule
	],
	providers: [RouteDataService],
	bootstrap: []
})
export class RoutesModule {}
