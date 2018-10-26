import { NgModule } from '@angular/core';
import { ElectronProxy } from './service';
import { NgxElectronModule } from 'ngx-electron';

@NgModule({
	declarations: [],
	exports: [],
	imports: [NgxElectronModule],
	providers: [ElectronProxy]
})
export class ElectronProxyModule {}
