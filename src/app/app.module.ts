import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgReduxModule } from '@angular-redux/store';
import { NgReduxRouterModule } from '@angular-redux/router';
import { AppComponent } from './app.component';
import { StoreModule } from './store/module';
import { RouterModule } from '@angular/router';
import { AppRoutes } from './app.routes';

@NgModule({
	declarations: [AppComponent],
	imports: [
		RouterModule.forRoot(AppRoutes),
		BrowserModule,
		NgReduxModule,
		NgReduxRouterModule.forRoot(),
		StoreModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}
