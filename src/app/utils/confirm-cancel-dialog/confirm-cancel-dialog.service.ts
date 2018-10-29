import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ConfirmCancelDialog } from './confirm-cancel-dialog.component';

export interface ConfirmCancelDialogData {
	title: string;
	text: string;
	buttonConfirmText?: string;
	buttonCancelText?: string;
	onConfirm: () => void;
	onCancel?: () => void;
	onClose?: () => void;
}

const WIDTH = '250px';

@Injectable({
	providedIn: 'root'
})
export class ConfirmCancelDialogService {
	public dialogRef: MatDialogRef<any>;
	constructor(public dialog: MatDialog) {}

	open(options: ConfirmCancelDialogData) {
		this.dialogRef = this.dialog.open(ConfirmCancelDialog, {
			data: options
		});

		const subscription = this.dialogRef.afterClosed().subscribe(result => {
			if (options.onClose) {
				options.onClose();
			}
			subscription.unsubscribe();
		});
	}
}
