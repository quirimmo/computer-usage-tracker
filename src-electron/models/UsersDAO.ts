import * as Nedb from 'nedb';
import { USERS_DATASTORE_FULL_NAME } from '../constants/DB.constants';
import { Subject, Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { User } from './User';
import { DBMSProxy } from '../services/DBMSProxy';

export class UsersDAO {
	private constructor() {}

	public static createDatastore(): Observable<Nedb | string> {
		const subject = new Subject<Nedb | string>();
		const datastore = new Nedb({
			filename: USERS_DATASTORE_FULL_NAME,
			autoload: true,
			onload
		});
		return subject.asObservable();

		function onload(err: Error) {
			if (err) {
				subject.error(
					`Error creating USERS datastore: ${err.name} - ${err.message}`
				);
			} else {
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
