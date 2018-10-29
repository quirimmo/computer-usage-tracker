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
		const subscription = this.electronProxyService
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
				subscription.unsubscribe();
			});
		return subject.asObservable();
	}

	public addUser(user: User): Observable<User[]> {
		const subject = new Subject<User[]>();
		const subscription = this.electronProxyService
			.sendMessageWithResponse({
				resource: 'users',
				data: {
					user
				},
				action: 'put',
				filters: {},
				message: 'add the given user'
			})
			.subscribe((returnedUsers: User[]) => {
				user.id = returnedUsers[0].id;
				subject.next(returnedUsers);
				subject.complete();
				subscription.unsubscribe();
			});
		return subject.asObservable();
	}

	public removeUser(user: User): Observable<number> {
		const subject = new Subject<number>();
		const subscription = this.electronProxyService
			.sendMessageWithResponse({
				resource: 'users',
				data: {
					user
				},
				action: 'delete',
				filters: {},
				message: 'delete the given user'
			})
			.subscribe((removedUsers: number) => {
				subject.next(removedUsers);
				subject.complete();
				subscription.unsubscribe();
			});
		return subject.asObservable();
	}
}
