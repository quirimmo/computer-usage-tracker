import { ElectronApp } from './services/ElectronApp';
import { DBMSProxy } from './services/DBMSProxy';
import { concat, Subscription } from 'rxjs';
import { dialog } from 'electron';
import { File } from './models/File';
import { FilesDAO } from './models/FilesDAO';
import * as moment from 'moment';
import Usage from './models/usage/Usage';
import { UsageDAO } from './models/usage/UsageDAO';
// import { delay, timeout } from 'rxjs/operators';

// ELECTRON
// ==============================

const operations = concat(
	DBMSProxy.getInstance().createDatastores(),
	ElectronApp.getInstance().initApp()
);

const subscription: Subscription = operations.subscribe(
	onSuccess,
	onError,
	onComplete
);

function onSuccess() {
	console.log('App Started Correctly');

	// DBMSProxy.getInstance().db.usage.persistence.compactDatafile();

	// const usage = new Usage(
	// 	getCurrTime(),
	// 	moment().format('YYYY-DD-MM HH[dsa]:mm[dsa]'),
	// 	'n4c8hdsmD2ywUsPF'
	// );
	// UsageDAO.update(usage).subscribe(data => console.log('updated data:', data));

	// setTimeout(() => {
	// console.log(DBMSProxy.getInstance().db);
	// }, 10 * 1000);

	// const usage = new Usage(getCurrTime());
	// setTimeout(() => {
	// 	usage.endTime = getCurrTime();
	// 	UsageDAO.insert([usage]).subscribe(data =>
	// 		console.log('inserted data:', data)
	// 	);
	// }, 2 * 1000);

	// const file = new File({
	// 	originalPath: 'Original Path',
	// 	path: 'final path'
	// });
	// const sub = FilesDAO.insert([file]).subscribe(data => {
	// 	console.log('inserted data:', data);
	// 	sub.unsubscribe();
	// });
	// const res = dialog.showOpenDialog({
	// 	properties: ['multiSelections']
	// });
	// console.log(res);

	function getCurrTime() {
		return moment().format('DD-MM-YYYY HH:mm:ss');
	}
}

function onError(err: any) {
	console.error('Error bootstrapping the app', err);
}

function onComplete() {
	subscription.unsubscribe();
}

// TASKS LIST
// ==============================

// const exec = require('child_process').exec;
// exec('tasklist', function(err: any, stdout: any, stderr: any) {
// 	console.log('task list:', stdout);
// });

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
