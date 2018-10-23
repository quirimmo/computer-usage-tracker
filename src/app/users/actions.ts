import { dispatch } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { User } from './model';
import { AnyAction, Action } from 'redux';

export interface UserAction extends Action {
	users?: User[];
}

@Injectable()
export class UserActions {
	static readonly FETCH_USERS = 'FETCH_USERS';

	@dispatch()
	public fetchUsers(): UserAction {
		return {
			type: UserActions.FETCH_USERS,
			users: [new User('Quirino'), new User('Pelota')]
		};
	}

	// fetch = (animalType: AnimalType): Action => ({
	// 	type: AnimalAPIActions.LOAD_ANIMALS,
	// 	meta: { animalType },
	// 	payload: null
	// });

	// loadStarted = (animalType: AnimalType): AnimalAPIAction => ({
	// 	type: AnimalAPIActions.LOAD_STARTED,
	// 	meta: { animalType },
	// 	payload: null
	// });

	// loadSucceeded = (
	// 	animalType: AnimalType,
	// 	payload: Payload
	// ): AnimalAPIAction => ({
	// 	type: AnimalAPIActions.LOAD_SUCCEEDED,
	// 	meta: { animalType },
	// 	payload
	// });

	// loadFailed = (animalType: AnimalType, error): AnimalAPIAction => ({
	// 	type: AnimalAPIActions.LOAD_FAILED,
	// 	meta: { animalType },
	// 	payload: null,
	// 	error
	// });
}
