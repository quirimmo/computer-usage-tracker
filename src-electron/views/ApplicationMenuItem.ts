// 		label: 'Users',
// 		submenu: [
// 			{
// 				label: 'Add User'
// 			},
// 			{
// 				label: 'Users List'
// 			}
// 		]

export default class ApplicationMenuItem {
	public submenu: ApplicationMenuItem[] = [];

	constructor(public label: string, public onClick?: () => void) {}

	addSubmenuItem(item: ApplicationMenuItem): void {
		this.submenu.push(item);
	}

	setOnClick(onClick: () => void): void {
		this.onClick = onClick;
	}

	getTemplate(): any {
		const ret: any = { label: this.label };
		if (this.submenu.length) {
			ret.submenu = this.submenu.map(item => ({
				label: item.label,
				click: item.onClick
			}));
		} else {
			ret.click = this.onClick;
		}
		return ret;
	}
}
