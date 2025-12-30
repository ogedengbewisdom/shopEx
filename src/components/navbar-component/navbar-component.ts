import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SearchInputComponent } from '../search-input-component/search-input-component';
import { CartComponent } from '../cart/cart';
import { ICartItem, IProduct } from '../../lib/interface';
import { ButtonComponent } from '../button-component/button-component';

@Component({
  selector: 'app-navbar-component',
  imports: [SearchInputComponent, CartComponent, ButtonComponent],
  templateUrl: './navbar-component.html',
  styleUrl: './navbar-component.css',
})
export class NavbarComponent {
  @Input() count!: number;
  showCart: boolean = false;
  @Output() search = new EventEmitter<string>();
  @Input() cartItems: ICartItem[] = [];
  @Output() addToCart = new EventEmitter<IProduct>();
  @Output() removeFromCart = new EventEmitter<IProduct>();
  @Output() clearCart = new EventEmitter<void>();
  @Input() total!: number;
  toggleCart() {
    this.showCart = !this.showCart;
  }

  onSearch(searchValue: string) {
    this.search.emit(searchValue);
  }
}
