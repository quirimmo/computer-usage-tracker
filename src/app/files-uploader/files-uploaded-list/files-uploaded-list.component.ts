import { Component, Input } from '@angular/core';
import { FileUploading } from '../file-uploading.model';

@Component({
	selector: 'files-uploaded-list',
	inputs: ['filesUploaded'],
	outputs: [],
	styleUrls: ['./files-uploaded-list.component.scss'],
	templateUrl: './files-uploaded-list.component.html'
})
export class FilesUploadedListComponent {
	@Input()
	filesUploaded: FileUploading[];

	constructor() {}
}
