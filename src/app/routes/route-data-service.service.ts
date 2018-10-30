import { Injectable } from '@angular/core';
import { User } from '../users/model';

@Injectable({
	providedIn: 'root'
})
export class RouteDataService {
	public currentUser?: User;

	constructor() {}
}
