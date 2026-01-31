
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
