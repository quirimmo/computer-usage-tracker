import { UsersPageComponent } from './routes/users-page/users-page.component';
import { HomePageComponent } from './routes/home-page/home-page.component';

export const AppRoutes = [
	{ path: 'home-page', component: HomePageComponent },
	{ path: 'users-page', component: UsersPageComponent },
	{ path: '**', component: HomePageComponent }
];
