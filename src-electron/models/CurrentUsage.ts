export default class CurrentUsage {
	constructor(public startTime?: string, public endTime?: string) {}

	public static createInstanceFromRawObject(rawCurrentUsage: any) {
		return new CurrentUsage(rawCurrentUsage.startTime, rawCurrentUsage.endTime);
	}
}
