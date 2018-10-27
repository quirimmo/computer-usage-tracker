import { ElectronAppCommunicator } from './ElectronAppCommunicator';
import { ICommunicationsChannelMessage } from './ICommunicationsChannelMessage';
import { ElectronApp } from '../services/ElectronApp';
import { UsersDAO } from './UsersDAO';
import { User } from './User';

export class UserCommunicator extends ElectronAppCommunicator {
	static readonly RESOURCE: string = 'users';

	constructor() {
		super(UserCommunicator.RESOURCE);
	}

	public onMessageReceived(message: ICommunicationsChannelMessage): void {
		if (message.action === 'get') {
			const sub = UsersDAO.fetch().subscribe((users: User[]) => {
				ElectronApp.getInstance().sendResponseToApp(users);
				sub.unsubscribe();
			});
		}

		// console.log('RECEIVED USERS MESSAGE');
		// console.log('sending response...');
		// ElectronApp.getInstance().sendMessageToApp(
		// 	'electron-app-channel-response',
		// 	'I am a fucking response'
		// );
		// ElectronApp.getInstance().sendMessageToApp(
		// 	'electron-app-channel-response',
		// 	'SECOND TIME: I am a fucking second response'
		// );
		// console.log('user communicator event', message);
	}
}
