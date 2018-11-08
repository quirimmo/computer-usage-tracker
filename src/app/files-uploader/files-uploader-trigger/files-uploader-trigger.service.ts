import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { FilesUploaderDialogComponent } from '../files-uploader-dialog/files-uploader-dialog.component';

@Injectable({
	providedIn: 'root'
})
export class FilesUploaderTriggerService {
	constructor(public dialog: MatDialog) {}

	open() {
		const dialogRef = this.dialog.open(FilesUploaderDialogComponent, {
			data: { test: 'I am test' }
		});

		const subscription = dialogRef.afterClosed().subscribe(result => {
			console.log('The dialog was closed', result);
			subscription.unsubscribe();
		});
	}
}
