import { User } from './model';
import { UserActions, UserAction } from './actions';

export function userReducer(state: User[] = [], action: UserAction): User[] {
	switch (action.type) {
		case UserActions.FETCH_USERS:
			return [].concat(...action.users);
		case UserActions.ADD_USER:
			return state.concat(...action.users);
		case UserActions.REMOVE_USER:
			const ids: string[] = action.users.map((u: User) => u.id);
			return state.filter((user: User) => !ids.includes(user.id));
		default:
			return state;
	}
}
