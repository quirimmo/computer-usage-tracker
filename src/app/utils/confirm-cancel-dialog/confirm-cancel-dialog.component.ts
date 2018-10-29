import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogData } from './confirm-cancel-dialog.service';

@Component({
	selector: 'confirm-cancel-dialog',
	inputs: [],
	outputs: [],
	styleUrls: ['./confirm-cancel-dialog.component.scss'],
	templateUrl: './confirm-cancel-dialog.component.html'
})
export class ConfirmCancelDialog {
	constructor(
		public dialogRef: MatDialogRef<ConfirmCancelDialog>,
		@Inject(MAT_DIALOG_DATA) public data: DialogData
	) {}

	public confirm() {
		this.data.onConfirm();
	}

	public cancel() {
		if (this.data.onCancel) {
			this.data.onCancel();
		}
	}
}
