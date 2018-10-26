import { NgModule } from '@angular/core';
import {
	DevToolsExtension,
	NgRedux,
	NgReduxModule
} from '@angular-redux/store';
import { provideReduxForms } from '@angular-redux/form';
import { NgReduxRouter, NgReduxRouterModule } from '@angular-redux/router';
import { StoreModel } from './model';
import { StoreReducer } from './reducers';
import thunk from 'redux-thunk';
import { applyMiddleware } from 'redux';

@NgModule({
	imports: [NgReduxModule, NgReduxRouterModule.forRoot()],
	providers: []
})
export class StoreModule {
	constructor(
		public store: NgRedux<StoreModel>,
		devTools: DevToolsExtension,
		ngReduxRouter: NgReduxRouter
	) {
		store.configureStore(
			StoreReducer,
			{},
			[thunk],
			devTools.isEnabled() ? [devTools.enhancer()] : []
		);

		// Enable syncing of Angular router state with our Redux store.
		if (ngReduxRouter) {
			ngReduxRouter.initialize();
		}

		// Enable syncing of Angular form state with our Redux store.
		provideReduxForms(store);
	}
}
