import { Component, computed, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../components/navbar-component/navbar-component';
import { PRODUCTS } from '../lib/service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class AppComponent implements OnInit {
  // fetchProducts = async () => {
  //   const response = await fetch('https://fakestoreapi.com/products');
  //   const data = await response.json();
  //   console.log(data);
  // };

  ngOnInit() {
    // this.fetchProducts();
  }
  protected readonly title = signal('shopEx');
}
