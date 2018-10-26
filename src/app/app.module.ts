import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgReduxModule } from '@angular-redux/store';
import { NgReduxRouterModule } from '@angular-redux/router';
import { NgReduxFormModule } from '@angular-redux/form';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { StoreModule } from './store/module';
import { RouterModule } from '@angular/router';
import { AppRoutes } from './app.routes';
import { NgxElectronModule } from 'ngx-electron';
import { UserModule } from './users/module';
import { ElectronProxyModule } from './electron-proxy/module';

@NgModule({
	declarations: [AppComponent],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		RouterModule.forRoot(AppRoutes),
		BrowserModule,
		NgReduxModule,
		NgReduxRouterModule.forRoot(),
		NgReduxFormModule,
		StoreModule,
		NgxElectronModule,
		UserModule,
		ElectronProxyModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}
