import { NgModule } from '@angular/core';
import {
	DevToolsExtension,
	NgRedux,
	NgReduxModule
} from '@angular-redux/store';
import { StoreModel } from './store.model';
import { StoreReducer } from './store.reducers';

@NgModule({
	imports: [NgReduxModule],
	providers: []
})
export class StoreModule {
	constructor(public store: NgRedux<StoreModel>, devTools: DevToolsExtension) {
		// Tell Redux about our reducers and epics. If the Redux DevTools
		// chrome extension is available in the browser, tell Redux about
		// it too.
		store.configureStore(
			StoreReducer,
			{},
			[],
			devTools.isEnabled() ? [devTools.enhancer()] : []
		);

		// Enable syncing of Angular router state with our Redux store.
		// if (ngReduxRouter) {
		// 	ngReduxRouter.initialize();
		// }

		// Enable syncing of Angular form state with our Redux store.
		// provideReduxForms(store);
	}
}
