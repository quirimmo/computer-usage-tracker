import { app, App, ipcMain, IpcMain } from 'electron';
import { MainWindow } from '../views/MainWindow';
import {
	ELECTRON_APP_DEV_URL,
	ELECTRON_APP_PROD_URL
} from '../constants/Electron.constants';
import { Observable, Subject } from 'rxjs';
import { ICommunicationsChannelMessage } from '../models/ICommunicationsChannelMessage';
import { ElectronAppCommunicator } from '../models/ElectronAppCommunicator';
import { UserCommunicator } from '../models/UserCommunicator';

export class ElectronApp {
	private static instance: ElectronApp = null;
	public app: App;
	public mainWindow: MainWindow = null;
	public isDevMode: boolean;
	public ipcMain: IpcMain = null;
	public communicationsChannel: Subject<ICommunicationsChannelMessage>;
	public communicators: Map<string, ElectronAppCommunicator>;

	private constructor() {
		this.isDevMode = process.argv[2].split('--')[1] === 'dev';
		this.app = app;
		this.ipcMain = ipcMain;
		this.communicationsChannel = new Subject<any>();
		this.communicators = new Map<string, ElectronAppCommunicator>();
	}

	public static getInstance(): ElectronApp {
		if (ElectronApp.instance === null) {
			ElectronApp.instance = new ElectronApp();
		}
		return ElectronApp.instance;
	}

	public initApp(): Observable<boolean> {
		const subject = new Subject<boolean>();
		// init app events
		this.app.on('ready', () => this.onAppReady(subject));
		this.app.on('window-all-closed', () => this.destroyApp());
		this.app.on('activate', () => this.onAppActivate());
		return subject.asObservable();
	}

	public initCommunicationsChannel(): void {
		this.communicators.set('users', new UserCommunicator());
		this.ipcMain.on('electron-app-channel', (event: any, arg: any) =>
			this.communicationsChannel.next({
				sender: event.sender,
				message: arg.message,
				data: arg.data,
				filters: arg.filters,
				action: arg.action
			})
		);
	}

	public sendMessageToApp(channel: string, payload: any): void {
		this.mainWindow.browserWindow.webContents.send(channel, payload);
	}

	public onAppReady(subject: Subject<boolean>): void {
		this.openGUI();
		// init app communications channel
		this.initCommunicationsChannel();
		subject.next(true);
		subject.complete();
	}

	public openGUI(): void {
		const fileURL: string = this.isDevMode
			? ELECTRON_APP_DEV_URL
			: ELECTRON_APP_PROD_URL;
		this.mainWindow = new MainWindow();
		this.mainWindow.openWindow(onWindowClosed);
		this.mainWindow.displayByURL(fileURL);

		function onWindowClosed() {
			console.log('window closed');
		}
	}

	public onAppActivate() {
		if (this.mainWindow.browserWindow === null) {
			this.openGUI();
		}
	}

	public destroyApp(): void {
		console.log('Destroying app...');
		if (process.platform !== 'darwin') {
			this.communicators.forEach((communicator: ElectronAppCommunicator) => {
				communicator.channel.complete();
				communicator.channel.unsubscribe();
			});
			this.communicationsChannel.unsubscribe();
			app.quit();
		}
	}
}
