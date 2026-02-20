import { ChangeDetectorRef, Component, DestroyRef, effect, inject, OnInit } from '@angular/core';
import { ProductCardComponent } from '../../../components/product-card-component/product-card-component';
import {
  BehaviorSubject,
  catchError,
  debounceTime,
  distinctUntilChanged,
  Observable,
  of,
  startWith,
  switchMap,
  tap,
} from 'rxjs';
import { CustomError, IProduct } from '../../../lib/interface';
import { ProductService } from '../../../services/product-service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { StateService } from '../../../services/state-service';
import { Loader } from '../../../components/loader/loader';
import { DisplayError } from '../../../components/display-error/display-error';

export interface ProductListState {
  products: IProduct[];
  loading: boolean;
  error: string | null;
  errorStatusCode: number | null;
}

@Component({
  selector: 'app-products-page',
  imports: [ProductCardComponent, CommonModule, Loader, DisplayError],
  templateUrl: './products-page.html',
  styleUrl: './products-page.css',
})
export class ProductsPage implements OnInit {
  router = inject(Router);
  route = inject(ActivatedRoute);
  products$!: Observable<IProduct[]>;
  destroyRef$ = inject(DestroyRef);
  productService = inject(ProductService);
  // state$!: Observable<ProductListState>;
  private stateService = inject(StateService);
  state$ = this.stateService.state$;

  // loading$ = new BehaviorSubject<boolean>(false);
  // errorMessage$ = new BehaviorSubject<string | null>(null);
  // errorStatusCode$ = new BehaviorSubject<number | null>(null);
  // constructor(
  //   private productService: ProductService,
  //   private cdr: ChangeDetectorRef,
  // ) {}

  navigateToProduct = (product: IProduct) => {
    this.router.navigate(['/products', product.id], {
      queryParams: { category: product.category || '' },
    });
  };

  // ngOnInit(): void {
  //   // this.products$ = this.productService.getAllProducts();
  //   this.route.queryParams.pipe(takeUntilDestroyed(this.destroyRef$)).subscribe((params) => {
  //     const search = params['name'] || '';
  //     this.products$ = this.productService.getAllProducts(search);
  //   });
  // }

  // using global state service
  ngOnInit(): void {
    this.stateService.resetSuccessAndError();
    this.route.queryParams
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap(() => {
          this.stateService.setLoading(true);
          this.stateService.setError(null, null);
        }),
        switchMap((params) => {
          const search = params['name'] || '';
          return this.productService.getAllProducts(search);
        }),
        tap((products) => {
          this.stateService.setProducts(products);
          this.stateService.setLoading(false);
        }),
        catchError((error: CustomError) => {
          this.stateService.setError(error.message, error.statusCode);
          this.stateService.setLoading(false);
          // this.stateService.setProducts([]);
          return of(null);
        }),
        takeUntilDestroyed(this.destroyRef$),
      )
      .subscribe();
  }

  // using local state service
  // ngOnInit(): void {
  //   // this.loadProducts();
  //   const initialState: ProductListState = {
  //     products: [],
  //     loading: true,
  //     error: null,
  //     errorStatusCode: null,
  //   };

  //   this.state$ = this.route.queryParams.pipe(
  //     debounceTime(300),
  //     distinctUntilChanged(),
  //     switchMap((param) => {
  //       const search = param['name'] || '';
  //       return this.productService.getAllProducts(search).pipe(
  //         switchMap((products) =>
  //           of({
  //             products,
  //             loading: false,
  //             error: null,
  //             errorStatusCode: null,
  //           } as ProductListState),
  //         ),
  //         catchError((err: CustomError) => {
  //           // console.log(err);
  //           return of({
  //             products: [],
  //             loading: false,
  //             error: err.message,
  //             errorStatusCode: err.statusCode,
  //           } as ProductListState);
  //         }),
  //         startWith(initialState),
  //       );
  //     }),
  //     takeUntilDestroyed(this.destroyRef$),
  //   );
  // }

  // loadProducts() {
  //   this.route.queryParams.pipe(
  //     takeUntilDestroyed(this.destroyRef$),
  //     switchMap((params) => {
  //       const search = params['name'] || '';
  //       return this.productService.getAllProducts(search);
  //     })
  //   ).subscribe((products) => {
  //     this.products$ = of(products);
  //   });
  // }

  isInCart(productId: number) {
    return this.stateService.isInCart(productId);
  }
}
