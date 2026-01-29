import { Component, inject } from '@angular/core';
import { ProductService } from '../../services/product-service';
import { CartComponent } from '../../components/cart/cart';
import { ButtonComponent } from '../../components/button-component/button-component';
// import { Router } from '@angular/router';
import { IProduct } from '../../lib/interface';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-product-page',
  imports: [CartComponent, ButtonComponent],
  templateUrl: './cart-product-page.html',
  styleUrl: './cart-product-page.css',
})
export class CartProductPage {
  private location = inject(Location);
  private router = inject(Router);
  productService = inject(ProductService);
  cartItems = this.productService.cartItems;
  total = this.productService.total;
  clearCart = () => {
    this.productService.cartItems.set([]);
  };

  addToCart = (product: IProduct) => {
    this.productService.addToCart(product);
  };

  goBack(): void {
    this.location.back();
  }

  checkout(): void {
    // this.router.navigate(['/checkout']);
    alert('Thank you for your purchase!');
    this.clearCart();
    this.router.navigate(['/products']);
  }

  removeFromCart = (product: IProduct) => {
    this.productService.removeFromCart(product);
  };
}
