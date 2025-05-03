import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgIcon, provideIcons, provideNgIconsConfig } from '@ng-icons/core';
import {
  heroArrowDown,
  heroArrowUp,
  heroCurrencyPound,
  heroWallet,
  heroCreditCard, // Import CreditCard icon
} from '@ng-icons/heroicons/outline';
import { OrganizerService } from '../../../services/organizer/organizer.service'; // Import the service
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel
import { Subject, takeUntil } from 'rxjs';

interface RecentTransaction {
  transactionId: string;
  description: string;
  date: string | Date;
  amount: number;
  status: string;
  type?: string;
}

interface PaymentFormData {
  accountNumber: string;
  accountName: string;
  phoneNumber: string;
  email: string;
}

@Component({
  selector: 'app-organizer-wallet',
  imports: [CommonModule, NgIcon, RouterModule, FormsModule],
  templateUrl: './organizer-wallet.component.html',
  providers: [
    provideIcons({ heroArrowDown, heroArrowUp, heroWallet, heroCurrencyPound, heroCreditCard }),
    provideNgIconsConfig({ size: '1.5em' }),
  ],
})
export class OrganizerWalletComponent implements OnInit, OnDestroy {
  walletData: any;
  transactions: any[] = [];
  loading: boolean = true;
  errorMessage: string = '';
  isDialogOpen: boolean = false;
  paymentMethod: 'vodafoneCash' | 'instapay' | 'bank' = 'bank';
  paymentFormData: PaymentFormData = {
    accountNumber: '',
    accountName: '',
    phoneNumber: '',
    email: '',
  };
  isProcessing: boolean = false;
  private ngUnsubscribe = new Subject<void>();
  storedPaymentInfo: PaymentFormData | null = null;
  storedPaymentMethod: 'vodafoneCash' | 'instapay' | 'bank' | null = null;

  constructor(private organizerService: OrganizerService) {}

  ngOnInit(): void {
    this.loadOrganizerWallet();
    this.loadStoredPaymentInfo();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  loadOrganizerWallet(): void {
    this.loading = true;
    this.organizerService.getOrganizerWallet().pipe(takeUntil(this.ngUnsubscribe)).subscribe({
      next: (response) => {
        console.log('Wallet Data:', response);
        this.walletData = response.data;
        this.transactions = (this.walletData?.recentTransactions || []).map((transaction: RecentTransaction) => ({
          id: transaction.transactionId,
          description: transaction.description,
          date: new Date(transaction.date).toLocaleDateString('en-GB', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          }),
          amount: `${transaction.amount >= 0 ? '+' : ''}${parseFloat(transaction.amount.toFixed(2))} EGP`,
          status: transaction.status,
          type: transaction.type,
        }));
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load wallet information.';
        console.error('Error loading organizer wallet:', error);
        this.loading = false;
      },
    });
  }

  openPaymentDialog(): void {
    this.isDialogOpen = true;
  }

  closePaymentDialog(): void {
    this.isDialogOpen = false;
  }

  handleInputChange(event: any): void {
    const { name, value } = event.target;
    this.paymentFormData = { ...this.paymentFormData, [name]: value };
  }

  handleSubmitPaymentInfo(): void {
    this.isProcessing = true;
    console.log('Payment method:', this.paymentMethod);
    console.log('Form data:', this.paymentFormData);

    localStorage.setItem('paymentMethod', this.paymentMethod);
    localStorage.setItem('paymentInfo', JSON.stringify(this.paymentFormData));

    setTimeout(() => {
      this.isProcessing = false;
      this.closePaymentDialog();
      this.showNotification('Payment information saved successfully!');
    }, 1500);
  }

  loadStoredPaymentInfo(): void {
    const storedMethod = localStorage.getItem('paymentMethod');
    const storedInfo = localStorage.getItem('paymentInfo');

    if (storedMethod && storedInfo) {
      this.storedPaymentMethod = storedMethod as 'vodafoneCash' | 'instapay' | 'bank';
      this.storedPaymentInfo = JSON.parse(storedInfo);
    }
  }

  showNotification(message: string): void {
    const notificationContainer = document.getElementById('notification-container');
    const notificationElement = document.getElementById('notification');

    if (notificationContainer && notificationElement) {
      notificationElement.textContent = message;
      notificationElement.classList.remove('translate-y-full', 'opacity-0');
      setTimeout(() => {
        notificationElement.classList.add('translate-y-full', 'opacity-0');
      }, 3000);
    }
  }
}
