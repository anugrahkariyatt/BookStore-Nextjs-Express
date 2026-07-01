export interface ShippingAddress {
  name: string;
  phone: string;
  addressLine1: string;
  city: string;
  state: string;
  pincode: string;
}

export interface OrderItem {
  _id: string;
  title: string;
  quantity: number;
  price: number;
  image?: string;
}

export interface Order {
  _id: string;
  userId: string;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  totalPrice: number;
  status: "Pending" | "Shipped" | "Delivered" | "Cancelled";
  createdAt: string;
  updatedAt: string;
}

export interface FetchOrdersResponse {
  orders: Order[];
}

export interface PlaceOrderResponse {
  order: Order;
}
