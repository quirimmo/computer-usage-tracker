import { Component } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { UserActions } from './users/actions';
import { select } from '@angular-redux/store';
import { User } from './users/model';
import { Observable } from 'rxjs';

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
		private actions: UserActions
	) {
		this.actions.fetchUsers();
		this.users$.subscribe(val => console.log('USERS AFTER FETCH:', val));
		if (this._electronService.isElectronApp) {
			this._electronService.ipcRenderer.on('pong', (event, arg) => {
				console.log(
					'RECEIVED RESPONSE FROM ELECTRON TO ANGULAR APP',
					event,
					arg
				);
			});
			this._electronService.ipcRenderer.on('ping-pong', (event, arg) => {
				console.log('RECEIVED DATA FROM ELECTRON TO ANGULAR APP', arg);
			});
		}
	}

	sendClick(): void {
		if (this._electronService.isElectronApp) {
			this._electronService.ipcRenderer.send('ping', 'wow wow wow');
		}
	}
}
