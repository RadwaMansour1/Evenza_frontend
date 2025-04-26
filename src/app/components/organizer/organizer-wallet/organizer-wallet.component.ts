import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgIcon, provideIcons, provideNgIconsConfig } from '@ng-icons/core';
import {
  heroArrowDown,
  heroArrowUp,
  heroCurrencyPound,
  heroWallet,
} from '@ng-icons/heroicons/outline';
@Component({
  selector: 'app-organizer-wallet',
  imports: [CommonModule, NgIcon,RouterModule],
  templateUrl: './organizer-wallet.component.html',
  providers: [
    provideIcons({ heroArrowDown, heroArrowUp, heroWallet, heroCurrencyPound }),
    provideNgIconsConfig({ size: '1.5em' }),
  ],
})
export class OrganizerWalletComponent {
  balances = [
    { label: 'Total Balance', amount: '12,500 EGP', highlight: true },
    { label: 'Available Balance', amount: '9,700 EGP', highlight: false },
    { label: 'Pending Balance', amount: '2,800 EGP', highlight: false },
  ];

  transactions = [
    {
      id: 'TX001',
      description: 'Ticket Sales - Summer Music Festival',
      date: 'Apr 22, 2025',
      amount: '+1,500 EGP',
      status: 'completed',
    },
    {
      id: 'TX002',
      description: 'Withdrawal to Bank Account',
      date: 'Apr 20, 2025',
      amount: '-5,000 EGP',
      status: 'completed',
    },
    {
      id: 'TX003',
      description: 'Ticket Sales - Tech Conference',
      date: 'Apr 19, 2025',
      amount: '+2,800 EGP',
      status: 'pending',
    },
  ];
}
