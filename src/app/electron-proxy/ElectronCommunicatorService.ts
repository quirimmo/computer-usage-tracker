import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ElectronChannelMessage } from './ElectronChannelMessage';

@Injectable({
	providedIn: 'root'
})
export class ElectronCommunicatorService {
	private navigationChannel: Subject<any> = new Subject<any>();

	constructor() {}

	parseMessage(message: ElectronChannelMessage): void {
		switch (message.resource) {
			case 'navigation':
				this.navigationChannel.next(message);
				break;
			default:
				break;
		}
	}

	getNavigationChannel(): Observable<any> {
		return this.navigationChannel.asObservable();
	}
}
