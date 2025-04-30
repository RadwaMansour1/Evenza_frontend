import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  heroCreditCard,
  heroCurrencyDollar,
  heroTicket,
  heroCalendar,
  heroInformationCircle,
  heroClock,
  heroMapPin,
  heroCheckCircle,
} from '@ng-icons/heroicons/outline';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketsService } from '../../services/tickets/tickets.service';
import { TicketModel } from '../../models/ticket.model';
import { CommonModule } from '@angular/common';
import { RefundService } from '../../services/refund/refund.service';
import { UserService } from '../../services/profile/user.service';
import Swal from 'sweetalert2';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-refund',
  imports: [FormsModule, NgIcon,CommonModule,TranslateModule],
  templateUrl: './refund.component.html',
  viewProviders: [
    provideIcons({
      heroCreditCard,
      heroCurrencyDollar,
      heroTicket,
      heroCalendar,
      heroInformationCircle,
      heroClock,
      heroMapPin,
      heroCheckCircle,
    }),
  ],
})
export class RefundComponent implements OnInit{
  refundReason: string = '';
  refundMethod:string = "";
  ticketDetails:TicketModel | null = null;
  refundDeadline: Date | null = null; 
  total:number|null = null;
  userId:string | null = null;

  constructor(
    private readonly route:ActivatedRoute ,
    private readonly router:Router,
    private readonly ticketService:TicketsService,
    private readonly refundService:RefundService,
    private readonly userService:UserService){}

  ngOnInit(): void {
    if(this.refundReason !== "duplicate"){
      this.refundReason = "requested_by_customer";
    }
    this.route.queryParams.subscribe((params) => {
      const ticketId = params['ticketId'];
      console.log("ticket id: ", ticketId);
      this.ticketService.getTicketById(ticketId).subscribe({
        next: (ticket:any) => {
          console.log("ticket details: ", ticket);
          this.ticketDetails = ticket.data;

          if(this.ticketDetails)
          this.total = this.ticketDetails?.price * this.ticketDetails?.quantity

          if (this.ticketDetails?.date) {
            const eventDate = new Date(this.ticketDetails.date);
            eventDate.setDate(eventDate.getDate() - 2);
            this.refundDeadline = eventDate;
          }
        },
        error: (err) => {
          throw new Error(err)
        }
      });
    });
    this.userService.getProfile().subscribe({
      next:(res)=>{
        console.log("user profile: ",res)
        this.userId = res.data._id
      },
      error:(err)=>{
        throw new Error(err)
      }
    })
  }

   submitRefund(){
    console.log(this.refundMethod)
    console.log("user id: ",this.userId)
    if(this.refundMethod === "wallet"){
      if(this.userId){
        this.refundService.refundToWallet(this.userId,this.total!).subscribe({
          next:(res)=>{
            console.log("refunded to wallet: ",res)
            Swal.fire({
              icon: 'success',
              title: 'Refunded Successfully To your Wallet',
              text: 'Your refund request has been processed successfully.',
              confirmButtonColor: '#9333ea'
            });
            this.router.navigate(["/my-tickets"]);
          },
          error:(err)=>{
            throw new Error(err)
          }
        })
      }
    }else if(this.refundMethod === "original"){
    console.log("method: ",this.refundMethod)
    if(this.refundReason !== "duplicate")
      this.refundReason = "requested_by_customer"
    
      this.refundService.refundOriginal(this.ticketDetails?.transactionId! , this.total! , this.refundReason).subscribe({
        next:(res)=>{
          console.log("refunded done successfully: ",res);
          Swal.fire({
            icon: 'success',
            title: 'Refunded Successfully',
            text: 'Your refund request has been processed successfully.',
            confirmButtonColor: '#9333ea'
          });
          this.router.navigate(["/my-tickets"]);
        },
        error:(err)=>{
          throw new Error(err);
        }
      })
    }else{
      Swal.fire({
        icon:'error',
        title: 'Select Refund Method',
        text: 'You Should select the method of refund request.',
        confirmButtonColor: '#9333ea'
      })
    }
  }
}
