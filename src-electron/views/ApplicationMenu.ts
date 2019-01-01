import ApplicationMenuItem from './ApplicationMenuItem';
import { Menu } from 'electron';
import { ElectronApp } from '../services/ElectronApp';
import { ElectronChannelMessage } from '../models/electron-channel-message/ElectronChannelMessage';

export default class ApplicationMenu {
	public items: Map<string, ApplicationMenuItem> = new Map();

	constructor() {
		this.adddMenuItems();
		Menu.setApplicationMenu(this.getTemplate());
	}

	adddMenuItems(): void {
		const home: ApplicationMenuItem = new ApplicationMenuItem('Home', () =>
			this.sendNavigationMessage('home-page')
		);
		const users: ApplicationMenuItem = new ApplicationMenuItem('Users');
		const addUser: ApplicationMenuItem = new ApplicationMenuItem(
			'Add User',
			() => this.sendNavigationMessage('add-user-page')
		);
		const usersList: ApplicationMenuItem = new ApplicationMenuItem(
			'Users List',
			() => this.sendNavigationMessage('users-page')
		);
		users.addSubmenuItem(addUser);
		users.addSubmenuItem(usersList);
		this.items.set('home', home);
		this.items.set('users', users);
	}

	sendNavigationMessage(route: string): void {
		const message: ElectronChannelMessage = {
			resource: 'navigation',
			action: 'put',
			filters: {},
			data: { route },
			message: `Navigate to ${route}`
		};
		ElectronApp.getInstance().sendMessageToApp(message);
	}

	getTemplate(): Menu {
		const menu: any = [];
		this.items.forEach((value: ApplicationMenuItem, key: string) => {
			menu.push(value.getTemplate());
		});
		return Menu.buildFromTemplate(menu);
	}
}
