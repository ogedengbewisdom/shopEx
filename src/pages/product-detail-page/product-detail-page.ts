import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product-service';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../components/button-component/button-component';
import { IProduct } from '../../lib/interface';

@Component({
  selector: 'app-product-detail-page',
  imports: [CommonModule, ButtonComponent],
  templateUrl: './product-detail-page.html',
  styleUrl: './product-detail-page.css',
})
export class ProductDetailPage implements OnInit {
  route = inject(ActivatedRoute);
  router = inject(Router);
  productService = inject(ProductService);
  productId = this.route.snapshot.paramMap.get('id');
  category = this.route.snapshot.queryParamMap.get('category');
  product$ = this.productService.getProductById(Number(this.productId));

  ngOnInit(): void {
    // this.route.queryParams.subscribe((params) => {
    //   console.log(params);
    // });
    // console.log(this.productId);
    // console.log(this.category);
  }

  addToCart(product: IProduct) {
    this.productService.addToCart(product);
  }

  navigateToProducts() {
    this.router.navigate(['/products']);
  }

  removeFromCart = (product: IProduct) => {
    this.productService.removeFromCart(product);
  };
  isInCart(product: IProduct) {
    return this.productService.isInCart(product);
  }
}
