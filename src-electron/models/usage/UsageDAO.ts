import * as Nedb from 'nedb';
import { Subject, Observable, of } from 'rxjs';
import { USAGE_DATASTORE_FULL_NAME } from '../../constants/DB.constants';
import { map, catchError } from 'rxjs/operators';
import { DBMSProxy } from '../../services/DBMSProxy';
import Usage from './Usage';

export class UsageDAO {
	private constructor() {}

	public static createDatastore(): Observable<Nedb> {
		const subject = new Subject<Nedb>();
		const datastore = new Nedb({
			filename: USAGE_DATASTORE_FULL_NAME,
			autoload: true,
			onload
		});
		return subject.asObservable();

		function onload(err: Error) {
			if (err) {
				console.error(
					`Error creating USAGE datastore: ${err.name} - ${err.message}`
				);
				subject.error(datastore);
			} else {
				console.log(`Datastore USAGE created successfully`);
				subject.next(datastore);
			}
			subject.complete();
		}
	}

	public static fetch(): Observable<Usage[]> {
		return DBMSProxy.getInstance()
			.fetchDocuments({}, DBMSProxy.getInstance().db.usage)
			.pipe(catchError((val: any) => of('Error fetching the usage')))
			.pipe(
				map((usage: any) =>
					usage.map((item: any) => Usage.createInstanceFromRawObject(item))
				)
			);
	}

	public static insert(usages: Usage[]): Observable<Usage[]> {
		return DBMSProxy.getInstance()
			.insertDocuments(usages, DBMSProxy.getInstance().db.usage)
			.pipe(catchError((val: any) => of('Error inserting the usages')));
	}

	public static update(usage: Usage): Observable<number> {
		return DBMSProxy.getInstance()
			.updateDocument(usage, DBMSProxy.getInstance().db.usage)
			.pipe(catchError((val: any) => of('Error updating the usages')));
	}

	// public static remove(user: User): Observable<number> {
	// 	return DBMSProxy.getInstance()
	// 		.removeDocument(user, DBMSProxy.getInstance().db.users)
	// 		.pipe(catchError((val: any) => of('Error removing the user')));
	// }
}
