import { Subject, Subscription } from 'rxjs';
import { ICommunicationsChannelMessage } from './ICommunicationsChannelMessage';
import { ElectronApp } from '../services/ElectronApp';

export abstract class ElectronAppCommunicator {
	public channel: Subject<ICommunicationsChannelMessage>;
	public subscription: Subscription;

	constructor(public resource: string) {
		this.channel = ElectronApp.getInstance().communicationsChannel;
		this.subscription = this.channel.subscribe(
			(message: ICommunicationsChannelMessage) => this.onChannelEvent(message),
			(err: any) => this.onChannelError(err),
			() => this.onChannelClosed()
		);
	}

	public abstract onMessageReceived(
		message: ICommunicationsChannelMessage
	): void;

	public onChannelEvent(message: ICommunicationsChannelMessage): void {
		if (message.resource === this.resource) {
			this.onMessageReceived(message);
		}
	}
	public onChannelError(err: any): void {
		console.error('Error occurred in the communications channel', err);
	}
	public onChannelClosed(): void {
		this.subscription.unsubscribe();
	}
}
