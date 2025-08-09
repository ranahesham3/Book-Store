import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'viewer', pathMatch: 'full' },
  {
    path: 'viewer',
    loadComponent: () =>
      import('./components/header/header.component').then(
        (c) => c.HeaderComponent
      ),
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'login',
        loadComponent: () =>
          import('./pages/login/login.component').then((c) => c.LoginComponent),
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./pages/register/register.component').then(
            (c) => c.RegisterComponent
          ),
      },
      {
        path: 'forget-password',
        loadComponent: () =>
          import('./pages/forget-password/forget-password.component').then(
            (c) => c.ForgetPasswordComponent
          ),
      },
      {
        path: 'reset/:token',
        loadComponent: () =>
          import('./pages/reset/reset.component').then((c) => c.ResetComponent),
      },
      {
        path: 'home',
        loadComponent: () =>
          import('./pages/home/home.component').then((c) => c.HomeComponent),
      },
      {
        path: ':isbn13',
        loadComponent: () =>
          import('./pages/book/book.component').then((c) => c.BookComponent),
      },
    ],
  },
  {
    path: 'user',
    loadComponent: () =>
      import('./components/header/header.component').then(
        (c) => c.HeaderComponent
      ),
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },

      {
        path: 'home',
        loadComponent: () =>
          import('./pages/home/home.component').then((c) => c.HomeComponent),
      },
      {
        path: 'cart',
        loadComponent: () =>
          import('./pages/cart/cart.component').then((c) => c.CartComponent),
      },
      {
        path: ':isbn13',
        loadComponent: () =>
          import('./pages/book/book.component').then((c) => c.BookComponent),
      },
    ],
  },
];
