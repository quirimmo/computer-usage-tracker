import { DBMSProxy } from './services/DBMSProxy';
import { UsersDAO } from './models/UsersDAO';
import { User } from './models/User';
import { concat, defer } from 'rxjs';

// DB INTERACTIONS EXAMPLE
// ==============================
const dbmsProxy: DBMSProxy = DBMSProxy.getInstance();
const user1 = new User('quirino');
const user2 = new User('chopper');
const users = [user1, user2];

const operations = concat(
	dbmsProxy.createDatastores(),
	defer(() => UsersDAO.insert(users)),
	defer(() => UsersDAO.fetch())
);
operations.subscribe(onSubscribe);
function onSubscribe(result: any) {
	console.log('Finished all: ', result);
}
