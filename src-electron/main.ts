// import { app, BrowserWindow, ipcMain } from 'electron';
import { ElectronApp } from './services/ElectronApp';

const electronApp = ElectronApp.getInstance();
electronApp.initApp().subscribe();
