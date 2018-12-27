import { WebContents } from 'electron';

export interface ICommunicationsChannelMessage {
	sender: WebContents;
	action: string;
	filters: any;
	message: string;
	data: any;
	resource: 'user' | 'usage';
}
