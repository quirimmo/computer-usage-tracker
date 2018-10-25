import { app, App } from 'electron';
import { MainWindow } from '../views/MainWindow';
import {
	ELECTRON_APP_DEV_URL,
	ELECTRON_APP_PROD_URL
} from '../constants/Electron.constants';
import { Observable, Subject } from 'rxjs';

export class ElectronApp {
	private static instance: ElectronApp = null;
	public app: App;
	public mainWindow: MainWindow = null;
	public isDevMode: boolean;

	private constructor() {
		this.isDevMode = process.argv[2].split('--')[1] === 'dev';
		this.app = app;
	}

	public static getInstance(): ElectronApp {
		if (ElectronApp.instance === null) {
			ElectronApp.instance = new ElectronApp();
		}
		return ElectronApp.instance;
	}

	public initApp(): Observable<boolean> {
		const subject = new Subject<boolean>();
		this.app.on('ready', () => this.onAppReady(subject));
		return subject.asObservable();
	}

	public onAppReady(subject: Subject<boolean>): void {
		this.openGUI();
		subject.next(true);
		subject.complete();
	}

	public openGUI(): void {
		const fileURL: string = this.isDevMode
			? ELECTRON_APP_DEV_URL
			: ELECTRON_APP_PROD_URL;
		this.mainWindow = new MainWindow();
		this.mainWindow.openWindow(this.destroyApp);
		this.mainWindow.displayByURL(fileURL);
	}

	public destroyApp(): void {
		console.log('destroying app...');
	}
}
