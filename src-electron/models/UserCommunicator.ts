import { ElectronAppCommunicator } from './ElectronAppCommunicator';
import { ICommunicationsChannelMessage } from './ICommunicationsChannelMessage';

export class UserCommunicator extends ElectronAppCommunicator {
	static readonly RESOURCE: string = 'users';

	constructor() {
		super(UserCommunicator.RESOURCE);
	}

	public onMessageReceived(message: ICommunicationsChannelMessage): void {
		console.log('RECEIVED USERS MESSAGE');
		// console.log('user communicator event', message);
	}
}
