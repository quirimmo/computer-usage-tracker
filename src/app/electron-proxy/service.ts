import { Injectable } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { ElectronChannelMessage } from './ElectronChannelMessage';
import { IpcRenderer } from 'electron';
import { Observable, Subject } from 'rxjs';
import { REQUEST_CHANNEL, RESPONSE_CHANNEL } from './constants';

@Injectable({
	providedIn: 'root'
})
export class ElectronProxyService {
	public renderer: IpcRenderer;
	public isElectronApp: boolean;

	constructor(private electronServiceInstance: ElectronService) {
		this.renderer = this.electronServiceInstance.ipcRenderer;
		this.isElectronApp = this.electronServiceInstance.isElectronApp;
		// this.testing();
	}

	public async testing() {
		const sub = await this.sendMessageWithResponse({
			resource: 'users',
			data: {},
			action: 'get',
			filters: {},
			message: 'fetch all the users'
		}).toPromise();
		console.log('received response:', sub);
	}

	public sendMessage(message: ElectronChannelMessage): void {
		if (this.isElectronApp) {
			this.renderer.send(REQUEST_CHANNEL, message);
		}
	}

	public sendResponse(message: any): void {
		if (this.isElectronApp) {
			this.renderer.send(RESPONSE_CHANNEL, message);
		}
	}

	public sendMessageWithResponse(
		message: ElectronChannelMessage
	): Observable<any> {
		const subject = new Subject<any>();
		if (this.isElectronApp) {
			this.renderer.once(RESPONSE_CHANNEL, (event: any, args: any) => {
				subject.next(args);
				subject.complete();
			});
			this.sendMessage(message);
		} else {
			subject.complete();
		}
		return subject.asObservable();
	}
}
