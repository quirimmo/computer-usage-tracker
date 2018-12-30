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
		return this.electronProxyService.sendMessageWithResponse({
			resource: 'user',
			data: {},
			action: 'get',
			filters: {},
			message: 'fetch all the users'
		});
	}

	public removeUser(user: User): Observable<number> {
		return this.electronProxyService.sendMessageWithResponse({
			resource: 'user',
			data: {
				user
			},
			action: 'delete',
			filters: {},
			message: 'delete the given user'
		});
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

	public updateUser(user: User): Observable<number> {
		const subject = new Subject<number>();
		const subscription = this.electronProxyService
			.sendMessageWithResponse({
				resource: 'users',
				data: {
					user
				},
				action: 'post',
				filters: {},
				message: 'update the given user'
			})
			.subscribe((updatedUsers: number) => {
				subject.next(updatedUsers);
				subject.complete();
				subscription.unsubscribe();
			});
		return subject.asObservable();
	}
}
