import { app, App, ipcMain, IpcMain } from 'electron';
import { MainWindow } from '../views/MainWindow';
import {
	ELECTRON_APP_DEV_URL,
	ELECTRON_APP_PROD_URL,
	REQUEST_CHANNEL,
	RESPONSE_CHANNEL
} from '../constants/Electron.constants';
import { Observable, Subject } from 'rxjs';
import { ICommunicationsChannelMessage } from '../communicators/ICommunicationsChannelMessage';
import { ElectronAppCommunicator } from '../communicators/ElectronAppCommunicator';
import { UserCommunicator } from '../communicators/UserCommunicator';
import { AppCommunicator } from '../communicators/AppCommunicator';
import { UsageCommunicator } from '../communicators/UsageCommunicator';
import ApplicationMenu from '../views/ApplicationMenu';
import { ElectronChannelMessage } from '../models/electron-channel-message/ElectronChannelMessage';

export class ElectronApp {
	private static instance: ElectronApp = null;
	public app: App;
	public mainWindow: MainWindow = null;
	public isDevMode: boolean;
	public ipcMain: IpcMain = null;
	public communicationsChannel: Subject<ICommunicationsChannelMessage>;
	public communicators: Map<string, ElectronAppCommunicator>;
	public isRendered = false;
	public appMenu: ApplicationMenu;

	private constructor() {
		this.isDevMode = process.argv[2].split('--')[1] === 'dev';
		if (this.isDevMode) {
			// disable console warnings in dev mode triggered by loading as view http://localhost
			process.env.ELECTRON_DISABLE_SECURITY_WARNINGS =
				'ELECTRON_DISABLE_SECURITY_WARNINGS';
		}
		this.app = app;
		this.ipcMain = ipcMain;
		this.communicationsChannel = new Subject<any>();
		this.communicators = new Map<string, ElectronAppCommunicator>();
		this.appMenu = new ApplicationMenu();
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
		this.communicators.set('user', new UserCommunicator());
		this.communicators.set('app', new AppCommunicator());
		this.communicators.set('usage', new UsageCommunicator());
		this.ipcMain.on(REQUEST_CHANNEL, (event: any, arg: any) =>
			this.communicationsChannel.next({
				sender: event.sender,
				message: arg.message,
				data: arg.data,
				filters: arg.filters,
				action: arg.action,
				resource: arg.resource
			})
		);
	}

	public sendMessageToApp(message: ElectronChannelMessage): void {
		this.mainWindow.browserWindow.webContents.send(REQUEST_CHANNEL, message);
	}

	public sendResponseToApp(payload: any): void {
		this.mainWindow.browserWindow.webContents.send(RESPONSE_CHANNEL, payload);
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
				if (!communicator.channel.isStopped) {
					communicator.channel.complete();
					communicator.channel.unsubscribe();
				}
			});
			this.communicationsChannel.unsubscribe();
			app.quit();
		}
	}
}
