export interface TicketModel {
    _id: string;
    transactionId:string,
    userId: string;
    eventId:string,
    eventName: string;
    ticketType: string;
    date:Date,
    time:string,
    location:string,
    purchaseDate:Date,
    price: number;
    quantity: number;
}