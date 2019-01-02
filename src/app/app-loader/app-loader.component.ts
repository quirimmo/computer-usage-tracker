import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { select } from '@angular-redux/store';

@Component({
	selector: 'app-loader',
	templateUrl: './app-loader.component.html',
	styleUrls: ['./app-loader.component.scss']
})
export class AppLoaderComponent {
	@select(['isLoading'])
	readonly isLoading$: Observable<boolean>;

	image: any = require('./app-loader.gif');

	constructor() {}
}
