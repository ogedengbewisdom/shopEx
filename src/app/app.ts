import { Component, computed, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../components/navbar-component/navbar-component';
import { ProductCardComponent } from '../components/product-card-component/product-card-component';
import { PRODUCTS } from '../lib/service';
import { ICartItem, IProduct } from '../lib/interface';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent],
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


  searchValue = signal<string>('');

  products = computed(() =>
    PRODUCTS.filter((product) =>
      product.name.toLocaleLowerCase().includes(this.searchValue().toLowerCase())
    )
  );


  // clearCart = () => {
  //   this.cartItems.set([]);
  // };
}
