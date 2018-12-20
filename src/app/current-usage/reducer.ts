import { CurrentUsageActions, CurrentUsageAction } from './actions';

export function currentUsageReducer(
	state: number = 0,
	action: CurrentUsageAction
): number {
	// let ids: string[] = [];
	switch (action.type) {
		// case CurrentUsageActions:
		// 	return [].concat(...action.users);
		// case UserActions.ADD_USER:
		// 	return state.concat(...action.users);
		// case UserActions.REMOVE_USER:
		// 	ids = action.users.map((u: User) => u.id);
		// 	return state.filter((user: User) => !ids.includes(user.id));
		// case UserActions.UPDATE_USER:
		// 	ids = action.users.map((u: User) => u.id);
		// 	return state.map((user: User) => {
		// 		if (!ids.includes(user.id)) {
		// 			return user;
		// 		}
		// 		return {
		// 			...user,
		// 			...action.users.find((u: User) => u.id === user.id)
		// 		};
		// 	});
		default:
			return state;
	}
}
