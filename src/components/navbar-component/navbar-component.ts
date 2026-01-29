import { Component, EventEmitter, inject, Input, OnInit, Output, signal } from '@angular/core';
import { SearchInputComponent } from '../search-input-component/search-input-component';
import { CartComponent } from '../cart/cart';
import { ICartItem, IProduct } from '../../lib/interface';
import { ButtonComponent } from '../button-component/button-component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductService } from '../../services/product-service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-navbar-component',
  imports: [SearchInputComponent, RouterModule],
  templateUrl: './navbar-component.html',
  styleUrl: './navbar-component.css',
})
export class NavbarComponent implements OnInit {
  // @Input() count!: number;
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private location = inject(Location);
  productService = inject(ProductService);
  count = this.productService.count;
  showCart: boolean = false;
  @Output() search = new EventEmitter<string>();

  @Output() addToCart = new EventEmitter<IProduct>();
  @Output() removeFromCart = new EventEmitter<IProduct>();
  @Output() clearCart = new EventEmitter<void>();
  @Input() total!: number;
  searchValue = signal<string>('');

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params['name']) {
        this.searchValue.set(params['name']);
      }
    });
  }

  get isProductsPage(): boolean {
    return this.router.url === '/products' || this.router.url.includes('/products?');
  }
  toggleCart() {
    this.showCart = !this.showCart;
  }

  navigateToCart() {
    this.router.navigate(['/cart']);
  }

  onSearch = (searchValue: string) => {
    this.router.navigate(['/products'], { queryParams: { name: searchValue } });
  };
}
