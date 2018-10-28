import { Component } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { UserActions } from './users/actions';
import { select, dispatch, NgRedux } from '@angular-redux/store';
import { User } from './users/model';
import { Observable } from 'rxjs';
import { ElectronProxyService } from './electron-proxy/service';
import { StoreModel } from './store/model';
import { UsersDAOService } from './users/dao.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'app';

	@select(['users'])
	readonly users$: Observable<User[]>;

	constructor(
		private _electronService: ElectronService,
		private actions: UserActions,
		private electronProxy: ElectronProxyService,
		private ngRedux: NgRedux<StoreModel>
	) {
		// const sub = this.actions.dispatchFetchUsersThunk().subscribe(() => {
		// 	sub.unsubscribe();
		// });
		// const sub = this.actions.dispatchFetchUsersThunk().subscribe((val: any) => {
		// 	console.log('subscribing to:', val);
		// });
		// .subscribe(val => {
		// 	console.log('subscribed val:', val);
		// 	console.log('users$', this.users$);
		// })
		// .unsubscribe();
		// this.users$.subscribe(val => console.log('USERS AFTER FETCH:', val));
		// if (this._electronService.isElectronApp) {
		// 	this._electronService.ipcRenderer.on('pong', (event, arg) => {
		// 		console.log(
		// 			'RECEIVED RESPONSE FROM ELECTRON TO ANGULAR APP',
		// 			event,
		// 			arg
		// 		);
		// 	});
		// 	this._electronService.ipcRenderer.on('ping-pong', (event, arg) => {
		// 		console.log('RECEIVED DATA FROM ELECTRON TO ANGULAR APP', arg);
		// 	});
		// }
	}

	sendUsersClick(): void {
		if (this._electronService.isElectronApp) {
			this._electronService.ipcRenderer.send('electron-app-channel', {
				resource: 'users',
				data: { test: 'customData' },
				method: 'post',
				filters: {},
				message: 'bla bla bla users'
			});
		}
	}

	sendActivitiesClick(): void {
		if (this._electronService.isElectronApp) {
			this._electronService.ipcRenderer.send('electron-app-channel', {
				resource: 'activities',
				data: { test: 'customData' },
				method: 'get',
				filters: {},
				message: 'bla bla bla activities'
			});
		}
	}
}
