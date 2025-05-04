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
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { PaymentService } from '../../services/payment/payment.service';
import { PaymentModel } from '../../models/payment.model';
import { RefundsRequestsService } from '../../services/refundRequests/refundRequests.service';

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
  private paymentId:string|null = null;
  private transactionId:string|null = null;
  private isrefunded:boolean =false;

  constructor(
    private readonly route:ActivatedRoute ,
    private readonly router:Router,
    private readonly ticketService:TicketsService,
    private readonly refundService:RefundService,
    private readonly userService:UserService,
    private readonly paymentService:PaymentService,
    private readonly refundRequestService:RefundsRequestsService,
    private readonly translate:TranslateService
  ){}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const ticketId = params['ticketId'];
      console.log("ticket id: ", ticketId);
      this.ticketService.getTicketById(ticketId).subscribe({
        next: (ticket:any) => {
          console.log("ticket details: ", ticket);
          this.ticketDetails = ticket.data;


          if(this.ticketDetails){
            this.total = this.ticketDetails?.price * this.ticketDetails?.quantity
          }

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
        if(this.userId){
          this.paymentService.getPaymentsByUserId(this.userId).subscribe({
            next:(res:any)=>{
              console.log("payments : ",res)
              const payments:any[] = res.data;
              payments.find((payment) => {
                if (payment.transactionId === this.ticketDetails?.transactionId) {
                  this.paymentId = payment._id;
                  console.log("payment id: ",this.paymentId)
                  return true;
                }
                return false;
              });
              if(this.paymentId){
                this.paymentService.getPaymentById(this.paymentId).subscribe({
                  next:(res:any)=>{
                    console.log("payment details: ",res)
                    this.transactionId = res.data.transactionId;
                    console.log("transaction id: ",this.transactionId)
                  },
                  error:(err)=>{
                    throw new Error(err)
                  }
                })
              }

              
            },
            error:(err)=>{
              console.log("payments error");
              throw new Error (err);
            }
          })
        }
      },
      error:(err)=>{
        throw new Error(err)
      }
    })
  }

   submitRefund(){
    
    // if(this.refundMethod === "wallet"){
     
    //   if(this.userId){
    //     this.refundService.refundToWallet(this.userId,this.transactionId!,this.total!).subscribe({
    //       next:(res)=>{
    //         console.log("refunded to wallet: ",res);
    //         this.isrefunded = true;
    //         this.ticketService.deleteTicket(this.ticketDetails?._id!).subscribe({
    //           next:(res)=>{
    //             console.log("ticket deleted: ",res);
    //           },
    //           error:(err)=>{
    //             throw new Error(err)
    //           }
    //         });
    //         this.refundService.createRefund(this.paymentId!,this.total!).subscribe({
    //           next:(res)=>{
    //             console.log("refund created: ",res);
    //           },
    //           error:(err)=>{
    //             throw new Error(err)
    //           }
    //         });
    //         Swal.fire({
    //           icon: 'success',
    //           title: 'Refunded Request has been Sent',
    //           text: 'Your refund request has been processed successfully.',
    //           confirmButtonColor: '#9333ea'
    //         });
    //         this.router.navigate(["/my-tickets"]);
    //       },
    //       error:(err)=>{
    //         throw new Error(err)
    //       }
    //     })
    //   }
    // }else if(this.refundMethod === "original"){
    // console.log("method: ",this.refundMethod)
    // if(this.refundReason !== "duplicate")
    //   this.refundReason = "requested_by_customer"
    
    //   this.refundService.refundOriginal(this.ticketDetails?.transactionId! , this.total! ,this.ticketDetails?._id!, this.refundReason).subscribe({
    //     next:(res)=>{
    //       console.log("refunded done successfully: ",res);
    //       Swal.fire({
    //         icon: 'success',
    //         title: 'Refunded Request has been Sent',
    //         text: 'Your refund request has been processed successfully.',
    //         confirmButtonColor: '#9333ea'
    //       });
    //       this.paymentService.updateStatus(this.paymentId!,"Refunded").subscribe({
    //         next:(res)=>{
    //           console.log("payment status updated: ",res);
    //         },
    //         error:(err)=>{
    //           throw new Error(err)
    //         }
    //       });
    //       this.router.navigate(["/my-tickets"]);
    //     },
    //     error:(err)=>{
    //       throw new Error(err);
    //     }
    //   })
    // }

    this.refundRequestService.getRefundsRequests().subscribe({
      next:(res)=>{
        const refundsrequests = res.data
        const index = refundsrequests.findIndex((request:any)=>request.paymentId === this.paymentId)
        if (index !== -1){
          // --- Apply translation here ---
          Swal.fire({
            icon:'error',
            title: this.translate.instant('REFUND.ALREADY_SENT_TITLE'), // Translate title
            text: this.translate.instant('REFUND.ALREADY_SENT_TEXT'), // Translate text
            confirmButtonColor: '#9333ea'
          })
          // --- End translation ---
        }else{
          if(this.refundReason === ""){
            // --- Apply translation here ---
            Swal.fire({
              icon:'error',
              title: this.translate.instant('REFUND.SELECT_REASON_TITLE'), // Translate title
              text: this.translate.instant('REFUND.SELECT_REASON_TEXT'), // Translate text
              confirmButtonColor: '#9333ea'
            })
            // --- End translation ---
          }else{
          if(this.refundMethod !== ""){
            console.log({
              userId: this.userId ,paymentId:this.paymentId ,tiketId:this.ticketDetails?._id,amount:this.total
            })
            if(this.userId && this.paymentId && this.ticketDetails?._id){
              this.refundRequestService.createRefundRequest(
                this.userId ,
                this.paymentId ,
                this.ticketDetails?._id,
                this.refundMethod,
                this.refundReason,
                this.total!
                ).subscribe({
                next:(res)=>{
                  console.log("refund request created: ",res);
                  // --- Apply translation here ---
                  Swal.fire({
                    icon:'success',
                    title: this.translate.instant('REFUND.REQUEST_SENT_TITLE'), // Translate title
                    text: this.translate.instant('REFUND.REQUEST_SENT_TEXT'), // Translate text
                    confirmButtonColor: '#9333ea'
                  });
                  // --- End translation ---
                  this.router.navigate(["/my-tickets"]);
                },
                error:(err)=>{
                   // --- Apply translation here ---
                  Swal.fire({
                    icon:'error',
                    title: this.translate.instant('REFUND.REQUEST_ERROR_TITLE'), // Translate title
                    text: this.translate.instant('REFUND.REQUEST_ERROR_TEXT'), // Translate text
                    confirmButtonColor: '#9333ea'
                  })
                   // --- End translation ---
                  // Consider logging the actual error instead of throwing it here,
                  // as throwing inside subscribe's error handler might not be caught globally.
                  console.error("Error creating refund request:", err);
                  // throw new Error(err); // Avoid throwing here unless specifically handled upstream
                }
              })
            }else{
               // --- Apply translation here ---
              Swal.fire({
                icon:'error',
                title: this.translate.instant('REFUND.MISSING_PARAM_TITLE'), // Translate title
                text: this.translate.instant('REFUND.MISSING_PARAM_TEXT'), // Translate text (reused SELECT_METHOD_TEXT, adjust if needed)
                confirmButtonColor: '#9333ea'
              })
               // --- End translation ---
            }
          }else{
             // --- Apply translation here ---
            Swal.fire({
              icon:'error',
              title: this.translate.instant('REFUND.SELECT_METHOD_TITLE'), // Translate title
              text: this.translate.instant('REFUND.SELECT_METHOD_TEXT'), // Translate text
              confirmButtonColor: '#9333ea'
            })
             // --- End translation ---
          }
          }
        }
      },
      error:(err)=>{
        console.log("error in getting all requests ",err)
        // Optionally show a translated error message here too
        Swal.fire({
          icon: 'error',
          title: this.translate.instant('COMMON.ERROR_FETCHING_DATA_TITLE'), // Example generic key
          text: this.translate.instant('COMMON.ERROR_FETCHING_DATA_TEXT'), // Example generic key
          confirmButtonColor: '#9333ea'
        });
      }
    })
    
    // if(this.isrefunded){
    //   this.paymentService.updateStatus(this.paymentId!,"Refunded").subscribe({
    //           next:(res)=>{
    //             console.log("payment status updated: ",res);
    //           },
    //           error:(err)=>{
    //             throw new Error(err)
    //           }
    //         });
    // }
  }
}
