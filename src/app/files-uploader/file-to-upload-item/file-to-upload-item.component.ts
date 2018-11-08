import {
	Component,
	Input,
	ViewChild,
	OnInit,
	EventEmitter,
	Output
} from '@angular/core';

export interface FileUploadItemModel {
	name: string;
	displayName?: string;
	description?: string;
}

@Component({
	selector: 'file-to-upload-item',
	inputs: ['file'],
	outputs: ['onRemoveFile'],
	styleUrls: ['./file-to-upload-item.component.scss'],
	templateUrl: './file-to-upload-item.component.html'
})
export class FileToUploadItemComponent implements OnInit {
	@Input()
	file: FileUploadItemModel;

	@Output()
	onRemoveFile: EventEmitter<any> = new EventEmitter();

	@ViewChild('fileToUploadForm')
	fileToUploadForm;

	constructor() {}

	ngOnInit(): void {
		if (this.file.name) {
			this.file.displayName = this.file.name;
		}
	}

	removeFile(): void {
		this.onRemoveFile.emit(this.file);
	}

	removeFileToUpload(): void {
		console.log('Removing file uploaded:', this.file.name);
	}
}
