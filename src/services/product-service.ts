import { HttpClient, HttpParams } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ICartItem, ICreateProduct, IProduct } from '../lib/interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = 'http://localhost:3000';
  private http = inject(HttpClient);
  cartItems = signal<ICartItem[]>([]);

  count = computed(() =>
    this.cartItems().reduce((total: number, item: ICartItem) => total + item.quantity, 0),
  );

  total = computed(() =>
    this.cartItems().reduce(
      (total: number, item: ICartItem) => total + item.quantity * item.price,
      0,
    ),
  );

  get totalCart() {
    return this.total();
  }

  get cartCount() {
    return this.count();
  }

  isInCart = (product: IProduct): boolean => {
    return this.cartItems().some((item) => item.id === product.id);
  };

  addToCart = (product: IProduct) => {
    const existingCartItem = this.cartItems().find((item) => item.id === product.id);

    if (existingCartItem) {
      // existingCartItem.quantity += 1;
      this.cartItems.update((items) =>
        items.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        ),
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

  removeFromCart = (product: IProduct) => {
    const existingCartItem = this.cartItems().find((item) => item.id === product.id);
    if (existingCartItem) {
      if (existingCartItem.quantity > 1) {
        this.cartItems.update((items) =>
          items.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item,
          ),
        );
      } else {
        this.cartItems.update((items) => items.filter((item) => item.id !== product.id));
      }
    }
  };

  clearCart = () => {
    this.cartItems.set([]);
  };

  getAllProducts(search?: string): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${this.baseUrl}/products`).pipe(
      map((products: IProduct[]) => {
        if (!search || search.trim() === '') {
          return products;
        }
        return products.filter((product: IProduct) =>
          product.name.toLowerCase().includes(search.toLowerCase()),
        );
      }),
    );
  }
  getProductById(id: string): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.baseUrl}/products/${id}`);
  }

  createProduct (product: ICreateProduct): Observable<ICreateProduct> {
    return this.http.post<ICreateProduct>(`${this.baseUrl}/products`, product);
  }
}
