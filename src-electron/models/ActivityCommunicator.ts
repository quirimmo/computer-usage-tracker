import { ElectronAppCommunicator } from './ElectronAppCommunicator';
import { ICommunicationsChannelMessage } from './ICommunicationsChannelMessage';

export class ActivityCommunicator extends ElectronAppCommunicator {
	static readonly RESOURCE: string = 'activities';

	constructor() {
		super(ActivityCommunicator.RESOURCE);
	}

	public onMessageReceived(message: ICommunicationsChannelMessage): void {
		console.log('activity communicator event', message);
	}
}
