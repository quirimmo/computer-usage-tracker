import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgReduxModule } from '@angular-redux/store';
import { AppComponent } from './app.component';
import { StoreModule } from './store/store.module';

@NgModule({
	declarations: [AppComponent],
	imports: [BrowserModule, NgReduxModule, StoreModule],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}
