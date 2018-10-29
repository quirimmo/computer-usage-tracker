import { NgModule } from '@angular/core';
import { ConfirmCancelDialog } from './confirm-cancel-dialog.component';
import { ConfirmCancelDialogService } from './confirm-cancel-dialog.service';
import { MatDialogModule, MatButtonModule } from '@angular/material';

@NgModule({
	declarations: [ConfirmCancelDialog],
	exports: [ConfirmCancelDialog],
	imports: [MatDialogModule, MatButtonModule],
	providers: [ConfirmCancelDialogService],
	bootstrap: [ConfirmCancelDialog]
})
export class ConfirmCancelDialogModule {}
