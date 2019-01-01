import { Component, NgZone } from '@angular/core';
import { RouteDataService } from '../routes/route-data-service.service';
import { Router } from '@angular/router';
import { ElectronCommunicatorService } from '../electron-proxy/ElectronCommunicatorService';
import { ElectronChannelMessage } from '../electron-proxy/ElectronChannelMessage';

@Component({
	selector: 'navigation-menu',
	inputs: [],
	outputs: [],
	styleUrls: ['./navigation-menu.component.scss'],
	template: ''
})
export class NavigationMenuComponent {
	constructor(
		private router: Router,
		private routeDataService: RouteDataService,
		private electronCommunicatorService: ElectronCommunicatorService,
		private zone: NgZone
	) {
		this.electronCommunicatorService
			.getNavigationChannel()
			.subscribe(this.onNavigationChannelMessage.bind(this));
	}

	onNavigationChannelMessage(message: ElectronChannelMessage): void {
		if (message.data.route === 'add-user-page') {
			this.routeDataService.currentUser = null;
		}
		this.zone.run(() => {
			this.router.navigate([`/${message.data.route}`]);
		});
	}
}
