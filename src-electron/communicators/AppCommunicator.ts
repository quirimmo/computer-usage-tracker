import { ElectronAppCommunicator } from './ElectronAppCommunicator';
import { ICommunicationsChannelMessage } from './ICommunicationsChannelMessage';
import { ElectronApp } from '../services/ElectronApp';

export class AppCommunicator extends ElectronAppCommunicator {
	static readonly RESOURCE: string = 'app';

	constructor() {
		super(AppCommunicator.RESOURCE);
	}

	public onMessageReceived(message: ICommunicationsChannelMessage): void {
		switch (message.action) {
			case 'post':
				ElectronApp.getInstance().isRendered = true;
				break;
			default:
				break;
		}
	}
}
