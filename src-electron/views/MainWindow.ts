import { BrowserWindow } from 'electron';
const devtron = require('devtron');

export class MainWindow {
	public browserWindow: BrowserWindow = null;

	public constructor() {}

	public openWindow(onClose?: () => void): void {
		this.browserWindow = new BrowserWindow({
			width: 1200,
			height: 800
		});
		devtron.install();
		this.browserWindow.webContents.openDevTools();
		this.browserWindow.on('close', () => this.onClose(onClose));
	}

	public displayByURL(url: string): void {
		this.browserWindow.loadURL(url);
	}

	public onClose(onClose?: () => void): void {
		this.browserWindow = null;
		onClose();
	}
}
