import * as Nedb from 'nedb';
import { Observable, Subject, of } from 'rxjs';
import { FILES_DATASTORE_FULL_NAME } from '../../constants/DB.constants';
import { File } from './File';
import { DBMSProxy } from '../../services/DBMSProxy';
import { catchError, map } from 'rxjs/operators';

export class FilesDAO {
	public static createDatastore(): Observable<Nedb> {
		const subject = new Subject<Nedb>();
		const datastore = new Nedb({
			filename: FILES_DATASTORE_FULL_NAME,
			autoload: true,
			onload
		});
		return subject.asObservable();

		function onload(err: Error) {
			if (err) {
				console.error(
					`Error creating FILES datastore: ${err.name} - ${err.message}`
				);
				subject.error(datastore);
			} else {
				console.log(`Datastore FILES created successfully`);
				subject.next(datastore);
			}
			subject.complete();
		}
	}

	public static insert(files: File[]): Observable<File[]> {
		return DBMSProxy.getInstance()
			.insertDocuments(files, DBMSProxy.getInstance().db.files)
			.pipe(catchError((val: any) => of('Error inserting the files')));
	}

	public static update(files: File[]): Observable<number> {
		return DBMSProxy.getInstance()
			.updateDocument(files, DBMSProxy.getInstance().db.files)
			.pipe(catchError((val: any) => of('Error updating the files')));
	}

	public static remove(file: File): Observable<number> {
		return DBMSProxy.getInstance()
			.removeDocument(file, DBMSProxy.getInstance().db.files)
			.pipe(catchError((val: any) => of('Error removing the files')));
	}

	public static fetch(): Observable<File[]> {
		return DBMSProxy.getInstance()
			.fetchDocuments({}, DBMSProxy.getInstance().db.files)
			.pipe(catchError((val: any) => of('Error fetching the files')))
			.pipe(
				map((files: any) =>
					files.map((file: any) => File.createFileFromRawObject(file))
				)
			);
	}
}
