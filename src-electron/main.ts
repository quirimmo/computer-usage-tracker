import { ElectronApp } from './services/ElectronApp';
import { DBMSProxy } from './services/DBMSProxy';
import { concat } from 'rxjs';

// ELECTRON
// ==============================

const operations = concat(
	DBMSProxy.getInstance().createDatastores(),
	ElectronApp.getInstance().initApp()
);

operations.subscribe(onSuccess, onError);

function onSuccess() {
	console.log('App Started Correctly');
}

function onError(err: any) {
	console.error('Error bootstrapping the app', err);
}

// PROCESSES
// ==============================

// const tasklist = require('tasklist');

// tasklist({ verbose: true }).then((tasks: any) => {
// 	const runningTasks = tasks.filter((task: any) => task.status === 'Running');
// 	runningTasks.sort((a: any, b: any) => a.memUsage > b.memUsage);
// 	console.log(runningTasks);
// 	/*
//     [{
//         imageName: 'taskhostex.exe',
//         pid: 1820,
//         sessionName: 'Console',
//         sessionNumber: 1,
//         memUsage: 4415488,
//     }, …]
//     */
// });
