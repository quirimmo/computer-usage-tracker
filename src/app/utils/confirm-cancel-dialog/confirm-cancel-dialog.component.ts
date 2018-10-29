import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ConfirmCancelDialogData } from './confirm-cancel-dialog.service';

@Component({
	selector: 'confirm-cancel-dialog',
	inputs: [],
	outputs: [],
	styleUrls: ['./confirm-cancel-dialog.component.scss'],
	templateUrl: './confirm-cancel-dialog.component.html'
})
export class ConfirmCancelDialog {
	buttonConfirmText: string;
	buttonCancelText: string;

	constructor(
		public dialogRef: MatDialogRef<ConfirmCancelDialog>,
		@Inject(MAT_DIALOG_DATA) public data: ConfirmCancelDialogData
	) {
		this.buttonConfirmText = data.buttonConfirmText || 'Confirm';
		this.buttonCancelText = data.buttonCancelText || 'Cancel';
	}

	public confirm() {
		this.data.onConfirm();
	}

	public cancel() {
		if (this.data.onCancel) {
			this.data.onCancel();
		}
	}
}
