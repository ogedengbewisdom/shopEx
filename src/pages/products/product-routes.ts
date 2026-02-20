import { Routes } from '@angular/router';
import { ProductsPage } from './products-page/products-page';
import { authGuard } from '../../guard/auth-guard';
import { ProductFormComponent } from './product-form-component/product-form-component';
import { ProductDetailPage } from './product-detail-page/product-detail-page';


export const PRODUCT_ROUTES: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    children: [
      { path: '', component: ProductsPage },
      { path: 'new', component: ProductFormComponent },
      { path: ':id', component: ProductDetailPage },
    ],
  },
];
