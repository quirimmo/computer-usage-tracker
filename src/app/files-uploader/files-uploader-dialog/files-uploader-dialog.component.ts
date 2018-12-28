import { Component, Inject, ViewChild, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FileUploading } from '../file-uploading.model';

export interface FilesUploaderDialogData {
	test: string;
}

@Component({
	selector: 'files-uploader-dialog',
	inputs: ['uploadedFiles'],
	outputs: [],
	styleUrls: ['./files-uploader-dialog.component.scss'],
	templateUrl: './files-uploader-dialog.component.html'
})
export class FilesUploaderDialogComponent {
	@Input()
	uploadedFiles: Set<File>;

	@ViewChild('fileInputElement')
	fileInputElement;

	@ViewChild('filesToUploadForm')
	filesToUploadForm;

	public files: Set<FileUploading> = new Set();
	// public files: Set<File> = new Set();

	constructor(
		public dialogRef: MatDialogRef<FilesUploaderDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: FilesUploaderDialogData
	) {}

	onSubmit() {
		console.log('submitting form', this.files);
	}

	onFilesChanged() {
		Array.from(this.fileInputElement.nativeElement.files).forEach((f: File) => {
			// console.log('File:', f);
			const reader = new FileReader();
			reader.readAsDataURL(f);
			reader.onload = (event: any) => {
				const uploadingFile: FileUploading = {
					id: '1',
					path: f.path,
					size: f.size,
					name: 'name',
					type: 'image',
					data: event.target.result
				};
				this.files.add(uploadingFile);
				console.log('uploading file:', uploadingFile);
			};
		});
	}

	onRemoveFile(file: FileUploading) {
		console.log('Removing file:', file);
		this.files.delete(file);
	}

	onOpenFileUploader() {
		this.fileInputElement.nativeElement.click();
	}
}
