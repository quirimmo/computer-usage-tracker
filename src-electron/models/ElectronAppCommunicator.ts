import { Subject, Subscription } from 'rxjs';
import { ICommunicationsChannelMessage } from './ICommunicationsChannelMessage';
import { ElectronApp } from '../services/ElectronApp';

export abstract class ElectronAppCommunicator {
	public channel: Subject<ICommunicationsChannelMessage>;
	public subscription: Subscription;

	constructor() {
		this.channel = ElectronApp.getInstance().communicationsChannel;
		this.subscription = this.channel.subscribe(
			(message: ICommunicationsChannelMessage) => this.onChannelEvent(message),
			() => this.onChannelError(),
			() => this.onChannelClosed()
		);
	}

	public abstract onChannelEvent(message: ICommunicationsChannelMessage): void;
	public abstract onChannelError(): void;
	public onChannelClosed(): void {
		this.subscription.unsubscribe();
	}
}
