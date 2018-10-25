import * as Nedb from 'nedb';
import { UsersDAO } from './models/UsersDAO';
import { Subscription, Subject, forkJoin, Observable } from 'rxjs';

export interface IComputerUsageTrackerDB {
	users?: Nedb;
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

	public createDatastores(): Observable<string> {
		const _this: DBMSProxy = this;
		const subject = new Subject<string>();
		const subscription: Subscription = UsersDAO.createDatastore().subscribe(
			onSuccess,
			onError,
			onFinally
		);
		return subject.asObservable();

		function onSuccess(datastore: Nedb): void {
			console.log(`USERS Datastore Created Successfully`);
			_this.db.users = datastore;
			subject.next('success');
		}

		function onError(err: string) {
			subject.error('error');
			console.error(err);
		}

		function onFinally() {
			subject.complete();
			subscription.unsubscribe();
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
