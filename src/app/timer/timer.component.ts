import { Component, Input } from '@angular/core';

@Component({
	selector: 'timer',
	inputs: ['value'],
	outputs: [],
	// styleUrls: ['./save-user.component.scss'],
	templateUrl: './timer.component.html'
})
export class TimerComponent {
	@Input()
	value: number;

	constructor() {
		// console.log(moment.duration(moment().valueOf()));
	}
}
