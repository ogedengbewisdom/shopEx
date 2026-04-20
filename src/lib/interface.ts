export interface ProductProperty {
  color: string;
  weight: string;
}

export interface IProduct {
  id: number;
  name: string;
  description?: string;
  price: number;
  category?: ICategory;
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
  category: ICategory;
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

// {
// 	"status": "success",
// 	"statusCode": 201,
// 	"success": true,
// 	"message": "login successful",
// 	"data": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsImVtYWlsIjoiam9obmxhc0B5b3BtYWlsLmNvbSIsImlhdCI6MTc3NDEzNTAwNSwiZXhwIjoxNzc0MTM4NjA1fQ.-yJhk5Vtn9KlIjoenElsD4nLkUYfoaGxB13yyn4m_js",
// 	"timestamp": "2026-03-21T23:16:45.831Z"
// }

export interface APIResponse<T> {
  status: string;
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
  timestamp: string;
}

export interface ICategory {
  id: number;
  name: string;
  description: string;
}
