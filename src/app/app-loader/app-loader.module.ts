import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppLoaderComponent } from './app-loader.component';
import { AppLoaderActions } from './app-loader.actions';

@NgModule({
	imports: [CommonModule],
	declarations: [AppLoaderComponent],
	exports: [AppLoaderComponent],
	providers: [AppLoaderActions]
})
export class AppLoaderModule {}
