import { dispatch } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { Action, Dispatch, AnyAction } from 'redux';
import { Observable, of } from 'rxjs';
import { map, tap, share, publish } from 'rxjs/operators';
import { NgRedux } from '@angular-redux/store';
import { StoreModel } from '../store/model';
// import { UsersDAOService } from './dao.service';

export interface CurrentUsageAction extends Action {
	currentUsageTime: number;
}

@Injectable()
export class CurrentUsageActions {
	static readonly FETCH_CURRENT_USAGE = 'FETCH_CURRENT_USAGE';
	static readonly UPDATE_CURRENT_USAGE = 'UPDATE_CURRENT_USAGE';

	constructor(private ngRedux: NgRedux<StoreModel>) {}

	// FETCH
	// ==============================

	public dispatchFetchCurrentUsageThunk(): Observable<CurrentUsageAction> {
		return this.fetchCurrentUsageThunk()(this.ngRedux.dispatch);
	}

	private fetchCurrentUsageThunk(): (
		disp: Dispatch<AnyAction>
	) => Observable<CurrentUsageAction> {
		return (disp: Dispatch<AnyAction>) =>
			this.fetchCurrentUsage().pipe(
				map((currentUsageTime: number) =>
					disp(this.fetchCurrentUsageFulfilled(currentUsageTime))
				)
			);
	}

	private fetchCurrentUsageFulfilled(
		currentUsageTime: number
	): CurrentUsageAction {
		return {
			type: CurrentUsageActions.FETCH_CURRENT_USAGE,
			currentUsageTime
		};
	}

	private fetchCurrentUsage(): Observable<number> {
		return of(1);
		// return this.usersDAOService.fetchUsers();
	}

	// UPDATE
	// ==============================

	public dispatchCurrentUsageThunk(
		currentUsageTime: number
	): Observable<CurrentUsageAction> {
		return this.updateCurrentUsageThunk(currentUsageTime)(
			this.ngRedux.dispatch
		);
	}

	private updateCurrentUsageThunk(
		currentUsageTime: number
	): (disp: Dispatch<AnyAction>) => Observable<CurrentUsageAction> {
		return (disp: Dispatch<AnyAction>) =>
			this.updateCurrentUsage(currentUsageTime).pipe(
				map((usage: number) => disp(this.updateUserFulfilled(usage)))
			);
	}

	private updateUserFulfilled(currentUsageTime: number): CurrentUsageAction {
		return {
			type: CurrentUsageActions.UPDATE_CURRENT_USAGE,
			currentUsageTime
		};
	}

	private updateCurrentUsage(currentUsage: number): Observable<number> {
		return of(1);
		// return this.usersDAOService.updateCurrentUsage(currentUsage);
	}
}
