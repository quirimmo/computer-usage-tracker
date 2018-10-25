import { DBMSProxy } from './DBMSProxy';
import { UsersDAO } from './models/UsersDAO';
import { User } from './models/User';
import { concat, defer } from 'rxjs';

// DB INTERACTIONS EXAMPLE
// ==============================
const dbmsProxy: DBMSProxy = DBMSProxy.getInstance();
const user1 = new User('quirino');
const user2 = new User('chopper');
const users = [user1, user2];

const operations = concat(
	dbmsProxy.createDatastores(),
	defer(() => UsersDAO.insert(users)),
	defer(() => UsersDAO.fetch())
);
operations.subscribe(onSubscribe);
function onSubscribe(result: any) {
	console.log('Finished all: ', result);
}


// import { app, BrowserWindow, ipcMain } from 'electron';
// const devtron = require('devtron');

// const isDevMode: boolean = process.argv[2].split('--')[1] === 'dev';
// const fileURL: string = isDevMode
// 	? 'http://localhost:4200/'
// 	: `file://${__dirname}/../dist/computer-usage-tracker/index.html`;

// let mainWindow: Electron.BrowserWindow;

// function createWindow() {
// 	// Create the browser window.
// 	mainWindow = new BrowserWindow({
// 		width: 1200,
// 		height: 800
// 	});

// 	// and load the index.html of the app.
// 	// mainWindow.loadFile(path.join(__dirname, './../src/index.html'));
// 	mainWindow.loadURL(fileURL);

// 	// Open the DevTools.
// 	devtron.install();
// 	mainWindow.webContents.openDevTools();

// 	// Emitted when the window is closed.
// 	mainWindow.on('closed', () => {
// 		// Dereference the window object, usually you would store windows
// 		// in an array if your app supports multi windows, this is the time
// 		// when you should delete the corresponding element.
// 		mainWindow = null;
// 	});
// }

// // This method will be called when Electron has finished
// // initialization and is ready to create browser windows.
// // Some APIs can only be used after this event occurs.
// app.on('ready', createWindow);

// // Quit when all windows are closed.
// app.on('window-all-closed', () => {
// 	// On OS X it is common for applications and their menu bar
// 	// to stay active until the user quits explicitly with Cmd + Q
// 	if (process.platform !== 'darwin') {
// 		app.quit();
// 	}
// });

// app.on('activate', () => {
// 	// On OS X it"s common to re-create a window in the app when the
// 	// dock icon is clicked and there are no other windows open.
// 	if (mainWindow === null) {
// 		createWindow();
// 	}
// });

// ipcMain.on('ping', (event: any, arg: any) => {
// 	console.log('RECEIVED PING FROM ANGULAR APP TO ELECTRON PROCESS', event, arg);
// 	event.sender.send('pong', 'yeah yeah yeah');
// });

// // In this file you can include the rest of your app"s specific main process
// // code. You can also put them in separate files and require them here.
