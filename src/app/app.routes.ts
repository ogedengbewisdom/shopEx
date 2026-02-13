import { Routes } from '@angular/router';
import { ProductsPage } from '../pages/products-page/products-page';
import { ProductDetailPage } from '../pages/product-detail-page/product-detail-page';
import { CartProductPage } from '../pages/cart-product-page/cart-product-page';
import { NotFoundPage } from '../pages/not-found-page/not-found-page';
import { ProductFormComponent } from '../pages/product-form-component/product-form-component';
import { LoginPage } from '../pages/login-page/login-page';
import { authGuard } from '../guard/auth-guard';

export const routes: Routes = [
  { path: 'login', component: LoginPage },
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  {
    path: 'products',
    canActivate: [authGuard],
    children: [
      { path: '', component: ProductsPage },
      { path: 'new', component: ProductFormComponent },
      { path: ':id', component: ProductDetailPage },
    ],
  },
  { path: 'cart', canActivate: [authGuard], component: CartProductPage },
  { path: '**', component: NotFoundPage },
];
