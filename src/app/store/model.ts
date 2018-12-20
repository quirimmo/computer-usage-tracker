import { User } from '../users/model';

export interface StoreModel {
	users?: User[];
	currentUsageTime?: number;
}
