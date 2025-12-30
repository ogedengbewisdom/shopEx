import { Component, computed, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../components/navbar-component/navbar-component';
import { ProductCardComponent } from '../components/product-card-component/product-card-component';
import { PRODUCTS } from '../lib/service';
import { ICartItem, IProduct } from '../lib/interface';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, ProductCardComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class AppComponent {
  // fetchProducts = async () => {
  //   const response = await fetch('https://fakestoreapi.com/products');
  //   const data = await response.json();
  //   console.log(data);
  // };

  // ngOnInit() {
  //   this.fetchProducts();
  // }
  protected readonly title = signal('shopEx');

  cartItems = signal<ICartItem[]>([]);
  count = computed(() =>
    this.cartItems().reduce((total: number, item: ICartItem) => total + item.quantity, 0)
  );

  total = computed(() =>
    this.cartItems().reduce(
      (total: number, item: ICartItem) => total + item.quantity * item.price,
      0
    )
  );

  searchValue = signal<string>('');

  products = computed(() =>
    PRODUCTS.filter((product) =>
      product.name.toLocaleLowerCase().includes(this.searchValue().toLowerCase())
    )
  );

  isInCart = (product: IProduct): boolean => {
    return this.cartItems().some((item) => item.id === product.id);
  };

  addToCart = (product: IProduct) => {
    const existingCartItem = this.cartItems().find((item) => item.id === product.id);

    if (existingCartItem) {
      // existingCartItem.quantity += 1;
      this.cartItems.update((items) =>
        items.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      this.cartItems.update((items) => [
        ...items,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          imageUrl: product.imageUrl,
          quantity: 1,
        },
      ]);
    }
  };

  onSearch = (searchValue: string) => {
    this.searchValue.set(searchValue);
  };

  removeFromCart = (product: IProduct) => {
    const existingCartItem = this.cartItems().find((item) => item.id === product.id);
    if (existingCartItem) {
      if (existingCartItem.quantity > 1) {
        this.cartItems.update((items) =>
          items.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item
          )
        );
      } else {
        this.cartItems.update((items) => items.filter((item) => item.id !== product.id));
      }
    }
  };

  clearCart = () => {
    this.cartItems.set([]);
  };
}
