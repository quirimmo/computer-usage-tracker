import { NgModule } from '@angular/core';
import { ElectronProxyService } from './service';
import { NgxElectronModule } from 'ngx-electron';

@NgModule({
	declarations: [],
	exports: [],
	imports: [NgxElectronModule],
	providers: [ElectronProxyService]
})
export class ElectronProxyModule {}
