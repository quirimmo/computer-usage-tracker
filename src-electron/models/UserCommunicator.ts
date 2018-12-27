import { ElectronAppCommunicator } from './ElectronAppCommunicator';
import { ICommunicationsChannelMessage } from './ICommunicationsChannelMessage';
import { ElectronApp } from '../services/ElectronApp';
import { UsersDAO } from './UsersDAO';
import { User } from './User';
import { Subscription } from 'rxjs';

export class UserCommunicator extends ElectronAppCommunicator {
	static readonly RESOURCE: string = 'user';

	constructor() {
		super(UserCommunicator.RESOURCE);
	}

	public onMessageReceived(message: ICommunicationsChannelMessage): void {
		let sub: Subscription;
		switch (message.action) {
			case 'get':
				sub = UsersDAO.fetch().subscribe((users: User[]) => {
					ElectronApp.getInstance().sendResponseToApp(users);
					sub.unsubscribe();
				});
				break;
			case 'put':
				sub = UsersDAO.insert([message.data.user]).subscribe(
					(users: User[]) => {
						ElectronApp.getInstance().sendResponseToApp(users);
						sub.unsubscribe();
					}
				);
				break;
			case 'post':
				sub = UsersDAO.update(message.data.user).subscribe(
					(numUpdated: number) => {
						ElectronApp.getInstance().sendResponseToApp(numUpdated);
						sub.unsubscribe();
					}
				);
				break;
			case 'delete':
				sub = UsersDAO.remove(message.data.user).subscribe(
					(numRemoved: number) => {
						ElectronApp.getInstance().sendResponseToApp(numRemoved);
						sub.unsubscribe();
					}
				);
				break;
			default:
				break;
		}

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
