import { User } from './model';
import { UserActions, UserAction } from './actions';

export function userReducer(state: User[] = [], action: UserAction): User[] {
	switch (action.type) {
		case UserActions.FETCH_USERS:
			return [].concat(...action.users);
		default:
			return state;
	}
}
