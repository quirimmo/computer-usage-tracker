import * as Nedb from 'nedb';
import { CURRENT_USAGE_DATASTORE_FULL_NAME } from '../constants/DB.constants';
import { Subject, Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { User } from './User';
import { DBMSProxy } from '../services/DBMSProxy';
import CurrentUsage from './CurrentUsage';

export class CurrentUsageDAO {
	private constructor() {}

	public static createDatastore(): Observable<Nedb> {
		const subject = new Subject<Nedb>();
		const datastore = new Nedb({
			filename: CURRENT_USAGE_DATASTORE_FULL_NAME,
			autoload: true,
			onload
		});
		return subject.asObservable();

		function onload(err: Error) {
			if (err) {
				console.error(
					`Error creating CURRENT USAGE datastore: ${err.name} - ${err.message}`
				);
				subject.error(datastore);
			} else {
				console.log(`Datastore CURRENT USAGE created successfully`);
				subject.next(datastore);
			}
			subject.complete();
		}
	}

	public static fetch(): Observable<CurrentUsage[]> {
		return DBMSProxy.getInstance()
			.fetchDocuments({}, DBMSProxy.getInstance().db.currentUsage)
			.pipe(catchError((val: any) => of('Error fetching the current usage')))
			.pipe(
				map((currentUsage: any) =>
					currentUsage.map((item: any) =>
						CurrentUsage.createInstanceFromRawObject(item)
					)
				)
			);
	}

	// public static insert(users: User[]): Observable<User[]> {
	// 	return DBMSProxy.getInstance()
	// 		.insertDocuments(users, DBMSProxy.getInstance().db.users)
	// 		.pipe(catchError((val: any) => of('Error inserting the users')));
	// }

	// public static update(users: User[]): Observable<number> {
	// 	return DBMSProxy.getInstance()
	// 		.updateDocument(users, DBMSProxy.getInstance().db.users)
	// 		.pipe(catchError((val: any) => of('Error updating the users')));
	// }

	// public static remove(user: User): Observable<number> {
	// 	return DBMSProxy.getInstance()
	// 		.removeDocument(user, DBMSProxy.getInstance().db.users)
	// 		.pipe(catchError((val: any) => of('Error removing the user')));
	// }
}
