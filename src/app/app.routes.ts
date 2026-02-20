import { Routes } from '@angular/router';
import { NotFoundPage } from '../pages/not-found-page/not-found-page';
import { authGuard } from '../guard/auth-guard';

export const routes: Routes = [
  { path: '', loadComponent: () => import('../pages/home-page/home-page').then((m) => m.HomePage) },
  {
    path: 'login',
    loadComponent: () => import('../pages/login-page/login-page').then((m) => m.LoginPage),
  },
  {
    path: 'products',
    loadChildren: () => import('../pages/products/product-routes').then((m) => m.PRODUCT_ROUTES),
  },
  {
    path: 'cart',
    canActivate: [authGuard],
    loadComponent: () =>
      import('../pages/cart-product-page/cart-product-page').then((m) => m.CartProductPage),
  },

  // note i did not lazy load the wildcard component because it is just little and we might need it immediately
  { path: '**', component: NotFoundPage },
];
