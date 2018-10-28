import { Injectable } from '@angular/core';
import { ElectronProxyService } from '../electron-proxy/service';
import { User } from './model';
import { Observable, of, Subject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class UsersDAOService {
	constructor(private electronProxyService: ElectronProxyService) {}

	public fetchUsers(): Observable<User[]> {
		const subject = new Subject<User[]>();
		this.electronProxyService
			.sendMessageWithResponse({
				resource: 'users',
				data: {},
				action: 'get',
				filters: {},
				message: 'fetch all the users'
			})
			.subscribe((users: User[]) => {
				subject.next(users);
				subject.complete();
			});
		return subject.asObservable();
	}
}
