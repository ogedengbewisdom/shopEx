export interface ProductProperty {
  color: string;
  weight: string;
}

export interface IProduct {
  id: number;
  name: string;
  description?: string;
  price: number;
  category?: 'men' | 'women';
  imageUrl: string;
  rating?: number;
  inStock?: boolean;
  properties?: ProductProperty[];
}

export interface ICreateProduct {
  id?: number;
  name: string;
  description: string;
  price: number;
  category: 'men' | 'women';
  imageUrl: string;
  rating: number;
  inStock: boolean;
  properties?: ProductProperty[];
}

export interface ICartItem {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

export class CustomError extends Error {
  statusCode: number;
  originalError?: any;
  constructor(message: string, statusCode: number, originalError?: any) {
    super(message);
    this.statusCode = statusCode;
    this.originalError = originalError;

    this.name = 'CustomError';

    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export interface IState {
  products: IProduct[];
  product: IProduct | null;
  loading: boolean;
  cart: ICartItem[];
  error: string | null;
  statusCode: number | null;
  success: string | null;
}
