import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroArrowDown, heroArrowUp, heroWallet  } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-my-wallet',
  imports: [CommonModule, NavBarComponent, NgIcon ],
  templateUrl: './my-wallet.component.html',
  viewProviders: [provideIcons({ heroArrowDown, heroArrowUp, heroWallet })],
})
export class MyWalletComponent {
  balance: number = 250.00;
  currency: string = 'EGP';
  lastTransaction: string = 'April 15, 2025';
  transactions: Array<any> = [
    {
      id: 'T001',
      type: 'purchase',
      amount: -99.00,
      description: 'Summer Music Festival Ticket',
      date: 'April 10, 2025'
    },
    {
      id: 'T002',
      type: 'refund',
      amount: +50.00,
      description: 'Partial Refund - Tech Conference',
      date: 'April 5, 2025'
    },
  ];

  formatAmount(amount: number): string {
    return Math.abs(amount).toFixed(2);
  }

}
