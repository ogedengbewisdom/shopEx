import { Routes } from '@angular/router';
import { ProductsPage } from '../pages/products-page/products-page';
import { ProductDetailPage } from '../pages/product-detail-page/product-detail-page';
import { CartProductPage } from '../pages/cart-product-page/cart-product-page';
import { NotFoundPage } from '../pages/not-found-page/not-found-page';
import { ProductFormComponent } from '../pages/product-form-component/product-form-component';

export const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  {
    path: 'products',
    children: [
      { path: '', component: ProductsPage },
      { path: 'new', component: ProductFormComponent},
      { path: ':id', component: ProductDetailPage },
    ],
  },
  { path: 'cart', component: CartProductPage },
  { path: '**', component: NotFoundPage },
];
