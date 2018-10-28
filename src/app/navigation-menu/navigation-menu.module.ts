import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationMenuComponent } from './navigation-menu.component';
import { MatButtonModule, MatMenuModule } from '@angular/material';
import { RouterModule } from '@angular/router';

@NgModule({
	declarations: [NavigationMenuComponent],
	imports: [CommonModule, MatButtonModule, MatMenuModule, RouterModule],
	exports: [NavigationMenuComponent],
	providers: [NavigationMenuComponent],
	bootstrap: []
})
export class NavigationMenuModule {}
