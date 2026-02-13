import { Component, EventEmitter, inject, Input, OnInit, Output, signal } from '@angular/core';
import { SearchInputComponent } from '../search-input-component/search-input-component';
import { CartComponent } from '../cart/cart';
import { ICartItem, IProduct } from '../../lib/interface';
import { ButtonComponent } from '../button-component/button-component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductService } from '../../services/product-service';
import { CommonModule, Location } from '@angular/common';
import { StateService } from '../../services/state-service';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-navbar-component',
  imports: [SearchInputComponent, RouterModule, CommonModule],
  templateUrl: './navbar-component.html',
  styleUrl: './navbar-component.css',
})
export class NavbarComponent implements OnInit {
  // @Input() count!: number;
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private stateService = inject(StateService);
  // productService = inject(ProductService);

  count = this.stateService.cartCount;
  showCart: boolean = false;
  @Output() search = new EventEmitter<string>();

  @Output() addToCart = new EventEmitter<IProduct>();
  @Output() removeFromCart = new EventEmitter<IProduct>();
  @Output() clearCart = new EventEmitter<void>();
  @Input() total!: number;
  private authService = inject(AuthService);
  isAuthenticated$ = this.authService.isAuthenticated$;
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

  logout() {
    this.authService.logout();
  }

  onSearch = (searchValue: string) => {
    this.router.navigate(['/products'], { queryParams: { name: searchValue } });
  };
}
