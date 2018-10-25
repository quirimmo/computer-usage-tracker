// import { app, BrowserWindow, ipcMain } from 'electron';
import { ElectronApp } from './services/ElectronApp';

const electronApp = ElectronApp.getInstance();
electronApp.initApp().subscribe(onSubscribe);

function onSubscribe() {
	console.log('THE APP IS READY');
	const subscription = electronApp.communicationsChannel.subscribe(msg => {
		console.log('RECEIVED MSG:', msg);
		electronApp.sendMessageToApp('pong', 'wow I am new pong!');
		// subscription.unsubscribe();
	});
}
