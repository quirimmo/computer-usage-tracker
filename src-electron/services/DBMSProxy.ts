import * as Nedb from 'nedb';
import { UsersDAO } from '../models/UsersDAO';
import {
	Subscription,
	Subject,
	forkJoin,
	Observable,
	concat,
	of,
	OperatorFunction
} from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { FilesDAO } from '../models/FilesDAO';

export interface IComputerUsageTrackerDB {
	users?: Nedb;
	files?: Nedb;
}

export class DBMSProxy {
	public static instance: DBMSProxy | null = null;
	public db: IComputerUsageTrackerDB = {};

	private constructor() {}

	public static getInstance(): DBMSProxy {
		if (DBMSProxy.instance === null) {
			DBMSProxy.instance = new DBMSProxy();
		}
		return DBMSProxy.instance;
	}

	public createDatastores(): Observable<Nedb[]> {
		const _this: DBMSProxy = this;
		return forkJoin(
			UsersDAO.createDatastore()
				.pipe(onDatastoreCreated(_this.db.users))
				.pipe(onDatastoreError()),
			FilesDAO.createDatastore()
				.pipe(onDatastoreCreated(_this.db.files))
				.pipe(onDatastoreError())
		);

		function onDatastoreCreated(
			dbDatastore: Nedb
		): OperatorFunction<Nedb, Nedb> {
			return map((datastore: Nedb) => {
				dbDatastore = datastore;
				return datastore;
			});
		}

		function onDatastoreError(): OperatorFunction<Nedb, Nedb> {
			return catchError((err: Nedb) => of(err));
		}
	}

	public insertDocuments(documents: any, datastore: Nedb): Observable<any> {
		const subject = new Subject<any>();
		datastore.insert(documents, onInsert);
		return subject.asObservable();

		function onInsert(err: Error, newDocuments: any) {
			if (err) {
				subject.error(err);
			} else {
				// add to the documents to insert the id just created from nedb when inserting the document
				documents.forEach((document: any, ind: number) => {
					document.id = newDocuments[ind]._id;
				});
				subject.next(documents);
			}
			subject.complete();
		}
	}

	public updateDocument(document: any, datastore: Nedb): Observable<any> {
		const subject = new Subject<any>();
		datastore.update({ _id: document.id }, document, {}, onUpdate);
		return subject.asObservable();

		function onUpdate(err: Error, numUpdated: any) {
			if (err) {
				subject.error(err);
			} else {
				subject.next(numUpdated);
			}
			subject.complete();
		}
	}

	public removeDocument(document: any, datastore: Nedb): Observable<any> {
		const subject = new Subject<any>();
		datastore.remove({ _id: document.id }, onRemove);
		return subject.asObservable();

		function onRemove(err: Error, numRemoved: any) {
			if (err) {
				subject.error(err);
			} else {
				subject.next(numRemoved);
			}
			subject.complete();
		}
	}

	public fetchDocuments(filters: any, datastore: Nedb): Observable<any> {
		const subject = new Subject<any>();
		datastore.find(filters, onFetch);
		return subject.asObservable();

		function onFetch(err: Error, documents: any) {
			if (err) {
				subject.error(err);
			} else {
				subject.next(documents);
			}
			subject.complete();
		}
	}
}
