import { Component } from '@angular/core';
import { ElectronService } from 'ngx-electron';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'app';

	constructor(private _electronService: ElectronService) {
		if (this._electronService.isElectronApp) {
			this._electronService.ipcRenderer.on('pong', (event, arg) => {
				console.log(
					'RECEIVED RESPONSE FROM ELECTRON TO ANGULAR APP',
					event,
					arg
				);
			});
		}
	}

	sendClick(): void {
		if (this._electronService.isElectronApp) {
			this._electronService.ipcRenderer.send('ping', 'wow wow wow');
		}
	}
}
