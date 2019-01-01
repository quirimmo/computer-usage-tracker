import { Injectable } from '@angular/core';
import { Action } from 'redux';
import { NgRedux } from '@angular-redux/store';
import { StoreModel } from '../store/model';

export interface AppLoaderAction extends Action {
	isLoading: boolean;
}

@Injectable()
export class AppLoaderActions {
	static readonly START_LOADING = 'START_LOADING';
	static readonly STOP_LOADING = 'STOP_LOADING';

	constructor(private ngRedux: NgRedux<StoreModel>) {}

	public startLoading(): AppLoaderAction {
		return {
			type: AppLoaderActions.START_LOADING,
			isLoading: true
		};
	}

	public stopLoading(): AppLoaderAction {
		return {
			type: AppLoaderActions.STOP_LOADING,
			isLoading: false
		};
	}
}
