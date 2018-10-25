import { ElectronAppCommunicator } from './ElectronAppCommunicator';
import { ICommunicationsChannelMessage } from './ICommunicationsChannelMessage';

export class UserCommunicator extends ElectronAppCommunicator {
	constructor() {
		super();
	}

	public onChannelEvent(message: ICommunicationsChannelMessage): void {
		console.log('user communicator event');
	}
	public onChannelError(): void {
		console.log('user communicator error');
	}
}
