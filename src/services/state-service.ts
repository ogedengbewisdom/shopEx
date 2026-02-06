import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { ICartItem, IProduct, IState } from '../lib/interface';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  private state = new BehaviorSubject<IState>({
    products: [],
    product: null,
    loading: false,
    cart: [],
    error: null,
    statusCode: null,
    success: null,
  });

  state$ = this.state.asObservable();

  products$ = this.state$.pipe(map((state) => state.products));

  loading$ = this.state$.pipe(map((state) => state.loading));

  cart$ = this.state$.pipe(map((state) => state.cart));

  error$ = this.state$.pipe(map((state) => state.error));

  statusCode$ = this.state$.pipe(map((state) => state.statusCode));

  product$ = this.state$.pipe(map((state) => state.product));

  get stateValue(): IState {
    return this.state.getValue();
  }

  setProducts(products: IProduct[]): void {
    const currentState = this.stateValue;
    this.state.next({
      ...currentState,
      products,
    });
  }

  setProductDetail(product: IProduct): void {
    const currentState = this.stateValue;
    this.state.next({
      ...currentState,
      product,
    });
  }

  setProduct(product: IProduct): void {
    const currentState = this.stateValue;
    this.state.next({
      ...currentState,
      products: [product, ...currentState.products],
    });
  }

  setLoading(loading: boolean): void {
    const currentState = this.stateValue;
    this.state.next({
      ...currentState,
      loading,
    });
  }

  setError(error: string | null, statusCode: number | null) {
    const currentState = this.stateValue;
    this.state.next({
      ...currentState,
      error,
      statusCode,
    });
  }

  setSuccess(success: string | null, statusCode: number | null): void {
    const currentState = this.stateValue;
    this.state.next({
      ...currentState,
      success,
      statusCode,
    });
  }

  resetState(): void {
    this.state.next({
      products: [],
      loading: false,
      cart: [],
      statusCode: null,
      error: null,
      success: null,
      product: null,
    });
  }

  resetSuccessAndError(): void {
    const currentState = this.stateValue;
    this.state.next({
      ...currentState,
      loading: false,
      error: null,
      statusCode: null,
      success: null,
    });
  }

  // setCart(cart: ICartItem[]): void {
  //   const currentState = this.stateValue;
  //   this.state.next({
  //     ...currentState,
  //     cart,
  //   });
  // }

  get cartCount(): Observable<number> {
    return this.cart$.pipe(map((cart) => cart.reduce((total, item) => total + item.quantity, 0)));
  }

  get totalPrice(): Observable<number> {
    return this.cart$.pipe(
      map((cart: ICartItem[]) =>
        cart.reduce((total: number, item: ICartItem) => total + item.quantity * item.price, 0),
      ),
    );
  }

  addToCart(product: IProduct): void {
    const currentState = this.stateValue;
    const existingCartItem = currentState.cart.find((cartItem) => cartItem.id === product.id);

    let updatedCart: ICartItem[] = [];
    if (existingCartItem) {
      updatedCart = currentState.cart.map((cartItem) =>
        cartItem.id === product.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem,
      );
    } else {
      const newCartItem: ICartItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
        quantity: 1,
      };
      updatedCart = [...currentState.cart, newCartItem];
      // this.state.next({
      //   ...currentState,
      //   cart: [...currentState.cart, newCartItem],
      // });
    }

    this.state.next({
      ...currentState,
      cart: updatedCart,
    });
  }

  removeFromCart(productId: number): void {
    const currentState = this.stateValue;
    const existingCartItem = currentState.cart.find((cartItem) => cartItem.id === productId);

    if (!existingCartItem) {
      return;
    }

    const updatedCart =
      existingCartItem.quantity > 1
        ? currentState.cart.map((cartItem) =>
            cartItem.id === productId ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem,
          )
        : currentState.cart.filter((cartItem) => cartItem.id !== productId);

    this.state.next({
      ...currentState,
      cart: updatedCart,
    });
  }

  clearCart(): void {
    const currentState = this.stateValue;
    this.state.next({
      ...currentState,
      cart: [],
    });
  }

  isInCart(productId: number): Observable<boolean> {
    // const currentState = this.stateValue;
    return this.cart$.pipe(map((cart) => cart.some((item) => item.id === productId)));
  }
}
