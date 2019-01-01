import { AppLoaderAction, AppLoaderActions } from './app-loader.actions';

export function appLoaderReducer(
	state: boolean = false,
	action: AppLoaderAction
): boolean {
	switch (action.type) {
		case AppLoaderActions.START_LOADING:
			return true;
		case AppLoaderActions.STOP_LOADING:
			return false;
		default:
			return state;
	}
}
