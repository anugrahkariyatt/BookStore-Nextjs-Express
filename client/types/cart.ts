export interface Book {
  _id: string;
  title: string;
  author: string;
  description: string;
  price: number;
  rating: number;
  image: string;
}

export interface CartItem {
  _id: string;
  quantity: number;
  bookId: Book;
}

export interface Cart {
  _id: string;
  userId: string;
  items: CartItem[];
  createdAt: string;
  updatedAt: string;
}

export interface FetchCartResponse {
  message: string;
  Cart: Cart;
}