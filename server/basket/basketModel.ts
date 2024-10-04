export interface Basket {
  basketId: string;
  userId: string;
  items: Item[];
}

export interface Item {
  itemId: string;
  productId: string;
  name: string;
  quantity: number;
  size: string;
}

export interface User {
  userId?: string; // Optional because it's auto-generated
  userName: string;
  email: string;
}
