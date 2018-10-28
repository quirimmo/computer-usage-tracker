import { NgModule } from '@angular/core';
import { UsersPageRouteModule } from './users-page/users-page.module';
import { HomePageRouteModule } from './home-page/home-page.module';

@NgModule({
	declarations: [],
	imports: [HomePageRouteModule, UsersPageRouteModule],
	providers: [],
	bootstrap: []
})
export class RoutesModule {}
