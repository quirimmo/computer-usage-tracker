import * as Nedb from 'nedb';
import { USERS_DATASTORE_FULL_NAME } from './constants/DB.constants';
import { UsersDAO } from './models/UsersDAO';

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

	public createDatastores(): void {
		this.db.users = UsersDAO.createDatastore();
	}

	public onDatastoreCreated(tableName: string): (err: Error) => void {
		return err => {
			if (err) {
				console.log(
					`Error creating the ${tableName.toUpperCase()} datastore: ${
						err.name
					} - ${err.message}`
				);
			}
			console.log(`${tableName.toUpperCase()} Datastore Created Successfully`);
		};
	}

	// public createDatastore(
	// 	datastore: string,
	// 	onLoad: (err: Error) => void
	// ): void {
	// 	switch (datastore) {
	// 		case 'users':
	// 			this.createUsersDatastore(onLoad);
	// 			break;
	// 		default:
	// 			throw new Error(
	// 				`The provided datastore ${datastore.toUpperCase()} is not expected`
	// 			);
	// 	}
	// }

	// public createUsersDatastore(onLoad: (err: Error) => void): void {
	// 	this.db.users = new Nedb({
	// 		filename: USERS_DATASTORE_FULL_NAME,
	// 		autoload: true,
	// 		onload: onLoad
	// 	});
	// }

	// public insertDocuments(documents: any, datastore: string): void {
	// 	this.db.users.insert(documents, (err: Error, newDocuments: any) => {
	// 		console.log('Documents Inserted Correctly');
	// 	});
	// }
}
