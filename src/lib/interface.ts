export interface IProduct {
  id: number;
  name: string;
  description?: string;
  price: number;
  imageUrl: string;
}

export interface ICartItem {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
}
