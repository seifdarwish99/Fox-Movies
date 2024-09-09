import { Routes } from '@angular/router';
import { logGuardGuard } from './@core/guards/log-guard.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('./@features/home/home.component').then(
        (component) => component.HomeComponent
      ),
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./@features/home/home.component').then(
        (component) => component.HomeComponent
      ),
  },
  {
    path: 'register', 
    loadComponent: () =>
      import('./@features/register/register.component').then(
        (component) => component.RegisterComponent
      ),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./@features/login/login.component').then(
        (component) => component.LoginComponent
      ),
  },
  {
    path: 'AllFilms',
    loadComponent: () =>
      import('./@features/all-films/all-films.component').then(
        (component) => component.AllFilmsComponent
      ),
      canActivate:[logGuardGuard], 
    children: [
      {
        path: 'movies',
        canActivate:[logGuardGuard], 
        loadComponent: () =>
          import('./@features/movies/movies.component').then(
            (component) => component.MoviesComponent
          ),
      },
      {
        path: 'popular',
        canActivate:[logGuardGuard], 
        loadComponent: () =>
          import('./@features/popular/popular.component').then(
            (component) => component.PopularComponent
          ),
      },
      {
        path: 'topRated',
        canActivate:[logGuardGuard], 
        loadComponent: () =>
          import('./@features/top-rated/top-rated.component').then(
            (component) => component.TopRatedComponent
          ),
      },
      {
        path: 'upComing',
        canActivate:[logGuardGuard], 
        loadComponent: () =>
          import('./@features/up-coming/up-coming.component').then(
            (component) => component.UpComingComponent
          ),
      },
      {
        path: 'nowPlaying',
        canActivate:[logGuardGuard], 
        loadComponent: () =>
          import('./@features/now-playing/now-playing.component').then(
            (component) => component.NowPlayingComponent
          ),
      },
      { path: '', redirectTo: 'movies', pathMatch: 'full' }, // Default child route
    ],
  },
  {
    path: 'actors',
    canActivate:[logGuardGuard], 
    loadComponent: () =>
      import('./@features/actors/actors.component').then(
        (component) => component.ActorsComponent
      ),
  },
];
