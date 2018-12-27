export interface FileConstructorArgs {
	originalPath: string;
	path: string;
	name?: string;
	description?: string;
	id?: string;
}

export class File {
	public originalPath: string;
	public path: string;
	public name: string;
	public description: string;
	public id: string;

	constructor(args: FileConstructorArgs) {
		this.originalPath = args.originalPath;
		this.path = args.path;
		this.name = args.name;
		this.description = args.description;
		this.id = args.id;
	}

	public static createFileFromRawObject(rawUser: any) {
		rawUser.id = rawUser._id;
		return new File(rawUser);
	}
}
