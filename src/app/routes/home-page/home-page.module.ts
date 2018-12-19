import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page.component';
import { TimerModule } from 'src/app/timer/timer.module';

@NgModule({
	declarations: [HomePageComponent],
	imports: [CommonModule, TimerModule],
	providers: [HomePageComponent],
	bootstrap: []
})
export class HomePageRouteModule {}
