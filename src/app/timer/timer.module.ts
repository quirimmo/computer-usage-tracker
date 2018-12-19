import { NgModule } from '@angular/core';
import { TimerComponent } from './timer.component';

@NgModule({
	declarations: [TimerComponent],
	exports: [TimerComponent],
	imports: [],
	providers: []
})
export class TimerModule {
	constructor() {
		console.log('added timer module');
	}
}
