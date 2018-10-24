export class DBMSProxy {
	static instance: DBMSProxy | null = null;

	private constructor() {}

	public static getInstance(): DBMSProxy {
		if (DBMSProxy.instance === null) {
			DBMSProxy.instance = new DBMSProxy();
		}
		return DBMSProxy.instance;
	}
}
