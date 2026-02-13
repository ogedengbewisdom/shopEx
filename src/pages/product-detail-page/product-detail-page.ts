import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product-service';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../components/button-component/button-component';
import { CustomError, IProduct } from '../../lib/interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BehaviorSubject, catchError, combineLatest, of, switchMap, tap } from 'rxjs';
import { StateService } from '../../services/state-service';
import { DisplayError } from '../../components/display-error/display-error';
import { Loader } from '../../components/loader/loader';

@Component({
  selector: 'app-product-detail-page',
  imports: [CommonModule, ButtonComponent, DisplayError, Loader],
  templateUrl: './product-detail-page.html',
  styleUrl: './product-detail-page.css',
})
export class ProductDetailPage implements OnInit {
  route = inject(ActivatedRoute);
  router = inject(Router);
  productService = inject(ProductService);
  productId = this.route.snapshot.paramMap.get('id') ?? '';
  category!: string;
  // product$ = new BehaviorSubject<IProduct | null>(null);

  private stateService = inject(StateService);
  state$ = this.stateService.state$;
  product$ = this.stateService.product$;
  destroyRef$ = inject(DestroyRef);
  ngOnInit(): void {
    this.stateService.resetSuccessAndError();
    combineLatest([this.route.params, this.route.queryParams])
      .pipe(
        tap(() => {
          this.stateService.setLoading(true);
          this.stateService.setError(null, null);
        }),
        switchMap(([params, queryParams]) => {
          const category = queryParams['category'] || '';
          const id = params['id'];
          this.category = category;
          return this.productService.getProductById(id);
        }),
        tap((product) => {
          this.stateService.setLoading(false);
          this.stateService.setProductDetail(product);
          // this.product$.next(product);
        }),
        catchError((error: CustomError) => {
          this.stateService.setError(error.message, error.statusCode);
          this.stateService.setLoading(false);
          return of(null);
        }),
        takeUntilDestroyed(this.destroyRef$),
      )
      .subscribe();
  }

  addToCart(product: IProduct) {
    this.stateService.addToCart(product);
  }

  navigateToProducts() {
    this.router.navigate(['/products']);
  }

  removeFromCart = (productId: number) => {
    this.stateService.removeFromCart(productId);
  };
  isInCart(productId: number) {
    return this.stateService.isInCart(productId);
  }
}
