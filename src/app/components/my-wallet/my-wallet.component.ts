import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroArrowDown, heroArrowUp, heroWallet  } from '@ng-icons/heroicons/outline';
import { WalletService } from '../../services/wallet/wallet.service';
import { UserService } from '../../services/profile/user.service';

@Component({
  selector: 'app-my-wallet',
  imports: [CommonModule, NgIcon ],
  templateUrl: './my-wallet.component.html',
  viewProviders: [provideIcons({ heroArrowDown, heroArrowUp, heroWallet })],
})
export class MyWalletComponent implements OnInit{
  balance: number = 0;
  currency: string = 'EGP';
  lastTransaction: string = 'no transactions yet';
  transactions: Array<any> = [];

  constructor(private readonly walletService:WalletService , private readonly userService:UserService){}
  ngOnInit(): void {
    this.userService.getProfile().subscribe({
      next:(res)=>{
        const userId = res.data._id;
        this.walletService.getTicketByUserId(userId).subscribe({
          next:(res)=>{
            const myWallet =res.data
            this.balance = myWallet.balance;
            this.currency = myWallet.currency
            this.transactions = myWallet.transactions
            this.lastTransaction = this.transactions[this.transactions.length-1].createdAt
          },
          error:(err)=>{
            console.log(err.message)
            throw new Error(err)
          }
        })
      },
      error:(err)=>{
        console.log(err.message)
        throw new Error(err)
      }
    })
  }

  formatAmount(amount: number): string {
    return Math.abs(amount).toFixed(2);
  }

}
