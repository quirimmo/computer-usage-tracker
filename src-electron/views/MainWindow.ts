import { BrowserWindow } from 'electron';
import { WIDTH, HEIGHT } from '../constants/Electron.constants';
const devtron = require('devtron');

export class MainWindow {
	public browserWindow: BrowserWindow = null;

	public constructor() {}

	public openWindow(onClose?: () => void): void {
		this.browserWindow = new BrowserWindow({
			width: WIDTH,
			height: HEIGHT
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
