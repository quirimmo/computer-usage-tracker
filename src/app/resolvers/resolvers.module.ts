import { NgModule } from '@angular/core';
import { UserModule } from '../users/module';
import { UsersResolver } from './users.resolver';

@NgModule({
	declarations: [],
	imports: [UserModule],
	providers: [UsersResolver],
	bootstrap: []
})
export class ResolversModule {}
