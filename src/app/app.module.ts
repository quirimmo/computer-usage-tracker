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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RoutesModule } from './routes/routes.module';
import { NavigationMenuModule } from './navigation-menu/navigation-menu.module';
import { ResolversModule } from './resolvers/resolvers.module';
import { ConfirmCancelDialogModule } from './utils/confirm-cancel-dialog/confirm-cancel-dialog.module';

@NgModule({
	declarations: [AppComponent],
	imports: [
		RoutesModule,
		BrowserAnimationsModule,
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
		ElectronProxyModule,
		NavigationMenuModule,
		ResolversModule,
		ConfirmCancelDialogModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}
