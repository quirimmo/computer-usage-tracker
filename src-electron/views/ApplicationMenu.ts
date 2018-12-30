import ApplicationMenuItem from './ApplicationMenuItem';
import { Menu } from 'electron';

export default class ApplicationMenu {
	public items: Map<string, ApplicationMenuItem> = new Map();

	constructor() {
		this.adddMenuItems();
		Menu.setApplicationMenu(this.getTemplate());
	}

	adddMenuItems(): void {
		const home: ApplicationMenuItem = new ApplicationMenuItem('Home', () =>
			console.log('Home Clicked')
		);
		const users: ApplicationMenuItem = new ApplicationMenuItem('Users');
		const addUser: ApplicationMenuItem = new ApplicationMenuItem(
			'Add User',
			() => console.log('Add User Clicked')
		);
		const usersList: ApplicationMenuItem = new ApplicationMenuItem(
			'Users List',
			() => console.log('Users List Clicked')
		);
		users.addSubmenuItem(addUser);
		users.addSubmenuItem(usersList);
		this.items.set('home', home);
		this.items.set('users', users);
	}

	getTemplate(): Menu {
		const menu: any = [];
		this.items.forEach((value: ApplicationMenuItem, key: string) => {
			menu.push(value.getTemplate());
		});
		return Menu.buildFromTemplate(menu);
	}
}
