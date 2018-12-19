import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
	selector: 'home-page',
	inputs: [],
	outputs: [],
	templateUrl: './home-page.component.html'
})
export class HomePageComponent implements OnInit, OnDestroy {
	value: number;
	interval: number;

	constructor() {
		this.value = 1;
	}

	ngOnInit(): void {
		this.interval = window.setInterval(() => {
			this.value++;
		}, 1000);
	}

	ngOnDestroy(): void {
		window.clearInterval(this.interval);
	}
}
