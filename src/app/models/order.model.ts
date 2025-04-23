export interface Order {
  _id: string;
  userId: string;
  totalPrice: number;
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
