export default class Usage {
	constructor(
		public startTime: string,
		public endTime?: string,
		public _id?: string
	) {}

	public static createInstanceFromRawObject(rawUsage: any) {
		return new Usage(rawUsage.startTime, rawUsage.endTime, rawUsage._id);
	}
}
