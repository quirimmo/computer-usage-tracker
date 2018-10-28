import { UsersPageComponent } from './routes/users-page/users-page.component';
import { HomePageComponent } from './routes/home-page/home-page.component';
import { AddUserPageComponent } from './routes/add-user-page/add-user-page.component';

export const AppRoutes = [
	{
		path: '',
		redirectTo: '/home-page',
		pathMatch: 'full'
	},
	{ path: 'home-page', component: HomePageComponent },
	{ path: 'add-user-page', component: AddUserPageComponent },
	{ path: 'users-page', component: UsersPageComponent },
	{ path: '**', component: HomePageComponent }
];
