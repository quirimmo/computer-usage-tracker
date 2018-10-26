import { Injectable } from '@angular/core';
import { ElectronService } from 'ngx-electron';

@Injectable({
	providedIn: 'root'
})
export class ElectronProxy {
	public test = 'TEST';
	constructor(private _electronService: ElectronService) {
		if (this._electronService.isElectronApp) {
			this._electronService.ipcRenderer.send('electron-app-channel', {
				resource: 'users',
				data: { test: 'customData' },
				method: 'post',
				filters: {},
				message: 'bla bla bla users'
			});
			// const res = this._electronService.ipcRenderer.sendSync(
			// 	'electron-app-channel',
			// 	{
			// 		resource: 'users',
			// 		data: { test: 'customData' },
			// 		method: 'post',
			// 		filters: {},
			// 		message: 'bla bla bla users'
			// 	}
			// );
			// console.log('RESP: ', res);
		}
	}

	public sendMessage(): void {}
}
