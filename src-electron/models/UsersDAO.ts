import * as Nedb from 'nedb';
import { USERS_DATASTORE_FULL_NAME } from '../constants/DB.constants';
import { DBMSProxy } from '../DBMSProxy';

export class UsersDAO {
	private constructor() {}

	public static createDatastore(): Nedb {
		return new Nedb({
			filename: USERS_DATASTORE_FULL_NAME,
			autoload: true,
			onload
		});

		function onload(err: Error) {
			DBMSProxy.getInstance().onDatastoreCreated('users')(err);
		}
	}
}
