import { Component } from '@angular/core';

@Component({
	selector: 'home-page',
	inputs: [],
	outputs: [],
	templateUrl: './home-page.component.html'
})
export class HomePageComponent {
	value: number;

	constructor() {
		this.value = 143878;
	}
}
