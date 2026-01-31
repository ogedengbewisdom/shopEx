import { ChangeDetectorRef, Component, DestroyRef, effect, inject, OnInit } from '@angular/core';
import { ProductCardComponent } from '../../components/product-card-component/product-card-component';
import { Observable, of, switchMap } from 'rxjs';
import { IProduct } from '../../lib/interface';
import { ProductService } from '../../services/product-service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-products-page',
  imports: [ProductCardComponent, CommonModule],
  templateUrl: './products-page.html',
  styleUrl: './products-page.css',
})
export class ProductsPage implements OnInit {
  router = inject(Router);
  route = inject(ActivatedRoute);
  products$!: Observable<IProduct[]>;
  destroyRef$ = inject(DestroyRef);
  productService = inject(ProductService);
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

  ngOnInit(): void {
  this.route.queryParams.pipe(
    takeUntilDestroyed(this.destroyRef$),
    switchMap((params) => {
      const search = params['name'] || '';
      return this.productService.getAllProducts(search);
    })
  ).subscribe((products) => {
    this.products$ = of(products);
  });
}

  addToCart(product: IProduct) {
    this.productService.addToCart(product);
  }

  isInCart(product: IProduct) {
    return this.productService.isInCart(product);
  }
}
