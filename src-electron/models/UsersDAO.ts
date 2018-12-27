import * as Nedb from 'nedb';
import { USERS_DATASTORE_FULL_NAME } from '../constants/DB.constants';
import { Subject, Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { User } from './User';
import { DBMSProxy } from '../services/DBMSProxy';

export class UsersDAO {
	private constructor() {}

	public static createDatastore(): Observable<Nedb> {
		const subject = new Subject<Nedb>();
		const datastore = new Nedb({
			filename: USERS_DATASTORE_FULL_NAME,
			autoload: true,
			onload
		});
		return subject.asObservable();

		function onload(err: Error) {
			if (err) {
				console.error(
					`Error creating USERS datastore: ${err.name} - ${err.message}`
				);
				subject.error(datastore);
			} else {
				console.log(`Datastore USERS created successfully`);
				subject.next(datastore);
			}
			subject.complete();
		}
	}

	public static insert(users: User[]): Observable<User[]> {
		return DBMSProxy.getInstance()
			.insertDocuments(users, DBMSProxy.getInstance().db.users)
			.pipe(catchError((val: any) => of('Error inserting the users')));
	}

	public static update(users: User[]): Observable<number> {
		return of(1);
		// return DBMSProxy.getInstance()
		// 	.updateDocument(users, DBMSProxy.getInstance().db.users)
		// 	.pipe(catchError((val: any) => of('Error updating the users')));
	}

	public static remove(user: User): Observable<number> {
		return DBMSProxy.getInstance()
			.removeDocument(user, DBMSProxy.getInstance().db.users)
			.pipe(catchError((val: any) => of('Error removing the user')));
	}

	public static fetch(): Observable<User[]> {
		return DBMSProxy.getInstance()
			.fetchDocuments({}, DBMSProxy.getInstance().db.users)
			.pipe(catchError((val: any) => of('Error fetching the users')))
			.pipe(
				map((users: any) =>
					users.map((user: any) => User.createUserFromRawObject(user))
				)
			);
	}
}
