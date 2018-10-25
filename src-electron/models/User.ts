export class User {
	public constructor(public firstName: string, public id?: string) {}

	public static createUserFromRawObject(rawUser: any) {
		return new User(rawUser.firstName, rawUser._id);
	}
}
