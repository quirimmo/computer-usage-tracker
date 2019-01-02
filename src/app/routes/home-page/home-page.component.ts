import { Component } from '@angular/core';
import { AppLoaderActions } from '../../app-loader/app-loader.actions';
import { NgRedux } from '@angular-redux/store';
import { StoreModel } from '../../store/model';

@Component({
	selector: 'home-page',
	inputs: [],
	outputs: [],
	templateUrl: './home-page.component.html'
})
export class HomePageComponent {
	value: number;

	constructor(
		private appLoaderActions: AppLoaderActions,
		private ngRedux: NgRedux<StoreModel>
	) {
		this.value = 143878;
		this.ngRedux.dispatch(this.appLoaderActions.startLoading());
		setTimeout(() => {
			this.ngRedux.dispatch(this.appLoaderActions.stopLoading());
		}, 2000);
	}
}
