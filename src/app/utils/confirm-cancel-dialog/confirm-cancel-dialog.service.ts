import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ConfirmCancelDialog } from './confirm-cancel-dialog.component';

export interface DialogData {
	title: string;
	text: string;
	onConfirm: () => void;
	onCancel?: () => void;
}

@Injectable({
	providedIn: 'root'
})
export class ConfirmCancelDialogService {
	constructor(public dialog: MatDialog) {}

	open(options: DialogData) {
		const dialogRef = this.dialog.open(ConfirmCancelDialog, {
			width: '250px',
			data: options
		});

		dialogRef.afterClosed().subscribe(result => {
			console.log('The dialog was closed');
		});
	}
}
