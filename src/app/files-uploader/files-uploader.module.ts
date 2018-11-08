import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilesUploaderTriggerComponent } from './files-uploader-trigger/files-uploader-trigger.component';
import {
	MatButtonModule,
	MatDialogModule,
	MatFormFieldModule,
	MatInputModule,
	MatIconModule,
	MatProgressBarModule,
	MatDividerModule,
	MatListModule
} from '@angular/material';
import { FilesUploaderDialogComponent } from './files-uploader-dialog/files-uploader-dialog.component';
import { FileToUploadItemComponent } from './file-to-upload-item/file-to-upload-item.component';
import { FormsModule } from '@angular/forms';
import { FileUploadedItemComponent } from './file-uploaded-item/file-uploaded-item.component';
import { FilesUploadedListComponent } from './files-uploaded-list/files-uploaded-list.component';
import { FilesUploaderTriggerService } from './files-uploader-trigger/files-uploader-trigger.service';

@NgModule({
	declarations: [
		FilesUploaderTriggerComponent,
		FilesUploaderDialogComponent,
		FileToUploadItemComponent,
		FileUploadedItemComponent,
		FilesUploadedListComponent
	],
	imports: [
		CommonModule,
		MatButtonModule,
		MatDialogModule,
		FormsModule,
		MatFormFieldModule,
		MatInputModule,
		MatIconModule,
		MatProgressBarModule,
		MatDividerModule,
		MatListModule
	],
	exports: [
		FilesUploaderTriggerComponent,
		FilesUploaderDialogComponent,
		FileToUploadItemComponent,
		FileUploadedItemComponent,
		FilesUploadedListComponent
	],
	providers: [FilesUploaderTriggerService],
	bootstrap: [FilesUploaderDialogComponent]
})
export class FilesUploaderModule {}
