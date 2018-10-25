// =========================================================================================

// ELECTRON CODE
// const { app, BrowserWindow, ipcMain } = require('electron');
// const devtron = require('devtron');

// let win;

// global.sharedData = {
// 	deckDef: []
// };

// function createWindow() {
// 	console.log('PROCESS TYPE:', process.type);
// 	// Create the browser window.
// 	win = new BrowserWindow({
// 		width: 1200,
// 		height: 800,
// 		backgroundColor: '#ffffff',
// 		icon: `file://${__dirname}/../dist/computer-usage-tracker/assets/logo.png`
// 	});

// 	win.loadURL(`file://${__dirname}/../dist/computer-usage-tracker/index.html`);

// 	// uncomment below to open the DevTools.
// 	devtron.install();
// 	win.webContents.openDevTools();

// 	// Event when the window is closed.
// 	win.on('closed', function() {
// 		win = null;
// 	});
// }

// // Create window on electron intialization
// app.on('ready', createWindow);

// // Quit when all windows are closed.
// app.on('window-all-closed', function() {
// 	// On macOS specific close process
// 	if (process.platform !== 'darwin') {
// 		app.quit();
// 	}
// });

// app.on('activate', function() {
// 	// macOS specific close process
// 	if (win === null) {
// 		createWindow();
// 	}
// });

// ipcMain.on('ping', (event, arg) => {
// 	console.log('RECEIVED PING FROM ANGULAR APP TO ELECTRON PROCESS', event, arg);
// 	event.sender.send('pong', 'yeah yeah yeah');
// });
