import { Component } from '@angular/core';
import { RouteDataService } from '../routes/route-data-service.service';
import { Router } from '@angular/router';

@Component({
	selector: 'navigation-menu',
	inputs: [],
	outputs: [],
	styleUrls: ['./navigation-menu.component.scss'],
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

	isHomeActive(): boolean {
		return this.router.url === '/home-page';
	}

	isUsersActive(): boolean {
		return Array.isArray(
			this.router.url.match(/\/(users|add-user|save-user)-page/)
		);
	}
}
