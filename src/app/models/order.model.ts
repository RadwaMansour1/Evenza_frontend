export interface Order {
  _id: string;
  userId: string;
  itemTotalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  countOfTickets: number;
  orderDetails: OrderDetail[];
  createdAt?: string;
  updatedAt?: string;
}

export interface OrderDetail {
  eventId: string;
  level: 'Silver' | 'Golden' | 'Platinum';
  numberOfTickets: number;
  totalPrice: number;
}

export interface CreateOrderPayload {
  userId: string;
  itemTotalPrice: number;
  countOfTickets: number;
  orderDetails: OrderDetail[];
}
