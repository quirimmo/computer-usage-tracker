import * as moment from 'moment';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';

@Component({
	selector: 'timer',
	inputs: ['value'],
	outputs: [],
	// styleUrls: ['./save-user.component.scss'],
	templateUrl: './timer.component.html'
})
export class TimerComponent implements OnInit, OnDestroy {
	@Input()
	value: number;

	current: string;
	interval: Observable<number>;
	intervalSubscription: Subscription;

	constructor() {}

	formatTimerDuration() {
		return moment(moment.duration(this.value).asMilliseconds()).format(
			'D [days] H [hours] m [minutes] s [seconds]'
		);
	}

	ngOnInit(): void {
		this.current = this.formatTimerDuration();
		this.interval = interval(1000);
		this.intervalSubscription = this.interval.subscribe(() => {
			this.value += 1000;
			this.current = this.formatTimerDuration();
		});
	}

	ngOnDestroy(): void {
		this.intervalSubscription.unsubscribe();
	}
}
