import { ElectronAppCommunicator } from './ElectronAppCommunicator';
import { ICommunicationsChannelMessage } from './ICommunicationsChannelMessage';
import { ElectronApp } from '../services/ElectronApp';
import { UsageDAO } from '../models/usage/UsageDAO';
import Usage from '../models/usage/Usage';
import { Subscription } from 'rxjs';

export class UsageCommunicator extends ElectronAppCommunicator {
	static readonly RESOURCE: string = 'usage';

	constructor() {
		super(UsageCommunicator.RESOURCE);
	}

	public onMessageReceived(message: ICommunicationsChannelMessage): void {
		let sub: Subscription;
		switch (message.action) {
			case 'get':
				sub = UsageDAO.fetch().subscribe((usages: Usage[]) => {
					ElectronApp.getInstance().sendResponseToApp(usages);
					sub.unsubscribe();
				});
				break;
			// case 'put':
			// 	sub = UsersDAO.insert([message.data.user]).subscribe(
			// 		(users: User[]) => {
			// 			ElectronApp.getInstance().sendResponseToApp(users);
			// 			sub.unsubscribe();
			// 		}
			// 	);
			// 	break;
			// case 'post':
			// 	sub = UsersDAO.update(message.data.user).subscribe(
			// 		(numUpdated: number) => {
			// 			ElectronApp.getInstance().sendResponseToApp(numUpdated);
			// 			sub.unsubscribe();
			// 		}
			// 	);
			// 	break;
			// case 'delete':
			// 	sub = UsersDAO.remove(message.data.user).subscribe(
			// 		(numRemoved: number) => {
			// 			ElectronApp.getInstance().sendResponseToApp(numRemoved);
			// 			sub.unsubscribe();
			// 		}
			// 	);
			// 	break;
			default:
				break;
		}
	}
}
