import { User } from './model';
import { UserActions, UserAction } from './actions';

export function userReducer(state: User[] = [], action: UserAction): User[] {
	let ids: string[] = [];
	switch (action.type) {
		case UserActions.FETCH_USERS:
			return [].concat(...action.users);
		case UserActions.ADD_USER:
			return state.concat(...action.users);
		case UserActions.REMOVE_USER:
			ids = action.users.map((u: User) => u.id);
			return state.filter((user: User) => !ids.includes(user.id));
		case UserActions.UPDATE_USER:
			ids = action.users.map((u: User) => u.id);
			return state.map((user: User) => {
				if (!ids.includes(user.id)) {
					return user;
				}
				return {
					...user,
					...action.users.find((u: User) => u.id === user.id)
				};
			});
		default:
			return state;
	}
}
