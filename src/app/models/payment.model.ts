
export interface PaymentModel{
    userId:string;
    eventId:string;
    orderId: string
    ticketType:string;
    quantity:number;
    amountPaid:number;
    currency:string;
    transactionId:string;
    paymentMethod:string;
    // completedAt: Date;
}