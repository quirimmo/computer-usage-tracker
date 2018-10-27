import { Injectable } from '@angular/core';
import { ElectronProxyService } from '../electron-proxy/service';
import { User } from './model';
import { Observable, of } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class UsersDAOService {
	constructor(private electronProxyService: ElectronProxyService) {
		console.log('electronProxyService', this.electronProxyService);
	}

	public fetchUsers(): Observable<User[]> {
		return of([new User('wowowowo')]);
	}
}
