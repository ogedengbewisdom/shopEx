import { Component, inject } from '@angular/core';
import { ProductService } from '../../services/product-service';
import { CartComponent } from '../../components/cart/cart';
import { ButtonComponent } from '../../components/button-component/button-component';
// import { Router } from '@angular/router';
import { IProduct } from '../../lib/interface';
import { CommonModule, Location } from '@angular/common';
import { Router } from '@angular/router';
import { StateService } from '../../services/state-service';

@Component({
  selector: 'app-cart-product-page',
  imports: [CartComponent, ButtonComponent, CommonModule],
  templateUrl: './cart-product-page.html',
  styleUrl: './cart-product-page.css',
})
export class CartProductPage {
  private location = inject(Location);
  private router = inject(Router);
  // productService = inject(ProductService);
  private stateService = inject(StateService);
  cartItems = this.stateService.cart$;
  // total = this.productService.total;
  totalPrice = this.stateService.totalPrice;
  clearCart = () => {
    this.stateService.clearCart();
  };

  addToCart = (product: IProduct) => {
    this.stateService.addToCart(product);
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

  removeFromCart = (productId: number) => {
    this.stateService.removeFromCart(productId);
  };
}
