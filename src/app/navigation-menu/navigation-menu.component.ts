import { Component } from '@angular/core';
import { RouteDataService } from '../routes/route-data-service.service';
import { Router } from '@angular/router';

@Component({
	selector: 'navigation-menu',
	inputs: [],
	outputs: [],
	templateUrl: './navigation-menu.component.html'
})
export class NavigationMenuComponent {
	constructor(
		private router: Router,
		private routeDataService: RouteDataService
	) {}

	navigateToAddUserPage() {
		this.routeDataService.currentUser = null;
		this.router.navigate(['/add-user-page']);
	}
}
