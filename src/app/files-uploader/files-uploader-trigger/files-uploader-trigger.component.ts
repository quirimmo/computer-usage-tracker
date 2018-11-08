import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { FilesUploaderTriggerService } from './files-uploader-trigger.service';

@Component({
	selector: 'files-uploader-trigger',
	inputs: ['triggerText'],
	outputs: [],
	styleUrls: ['./files-uploader-trigger.component.scss'],
	templateUrl: './files-uploader-trigger.component.html'
})
export class FilesUploaderTriggerComponent implements OnInit {
	@Input()
	triggerText?: string;

	constructor(
		public dialog: MatDialog,
		public filesUploaderTriggerService: FilesUploaderTriggerService
	) {}

	ngOnInit() {
		this.triggerText = this.triggerText || 'Open Files Uploader';
	}

	onOpenFilesUploader() {
		this.filesUploaderTriggerService.open();
	}
}
