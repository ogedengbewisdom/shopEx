import { Routes } from '@angular/router';
import { ProductsPage } from '../pages/products-page/products-page';
import { ProductDetailPage } from '../pages/product-detail-page/product-detail-page';
import { CartProductPage } from '../pages/cart-product-page/cart-product-page';
import { NotFoundPage } from '../pages/not-found-page/not-found-page';

export const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  {
    path: 'products',
    children: [
      { path: '', component: ProductsPage },
      { path: ':id', component: ProductDetailPage },
    ],
  },
  { path: 'cart', component: CartProductPage },
  { path: '**', component: NotFoundPage },
];
