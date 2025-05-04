import { CommonModule,Location } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgIcon, provideIcons, provideNgIconsConfig } from '@ng-icons/core';
import {
  heroArrowDown,
  heroArrowUp,
  heroCurrencyPound,
  heroWallet,
  heroCreditCard,
} from '@ng-icons/heroicons/outline';
import { OrganizerService } from '../../../services/organizer/organizer.service';
import { FormsModule } from '@angular/forms';
import { Subject, takeUntil, tap } from 'rxjs';
import { CONSTANTS } from '../../../constants';
import {
  TransferInfo,
  TransferInfoResponse,
} from '../../../models/transfer-info.model';
interface RecentTransaction {
  transactionId: string;
  description: string;
  date: string | Date;
  amount: number;
  status: string;
  type?: string;
}

@Component({
  selector: 'app-organizer-wallet',
  imports: [CommonModule, NgIcon, RouterModule, FormsModule],
  templateUrl: './organizer-wallet.component.html',
  providers: [
    provideIcons({
      heroArrowDown,
      heroArrowUp,
      heroWallet,
      heroCurrencyPound,
      heroCreditCard,
    }),
    provideNgIconsConfig({ size: '1.5em' }),
  ],
})
export class OrganizerWalletComponent implements OnInit, OnDestroy {
  walletData: any;
  transactions: any[] = [];
  loading: boolean = true;
  errorMessage: string = '';
  isDialogOpen: boolean = false;
  paymentMethod: 'E-Wallet' | 'InstaPay' | 'Bank' = 'Bank';
  paymentFormData: Omit<TransferInfo, 'organizerId' | 'type'> = {
    accountNumber: '',
    accountName: '',
    walletPhoneNumber: '',
    email: '',
  };
  isProcessing: boolean = false;
  private ngUnsubscribe = new Subject<void>();
  storedPaymentInfo: Omit<TransferInfo, 'organizerId' | 'type'> | null = null;
  storedPaymentMethod: 'E-Wallet' | 'Instapay' | 'Bank' | null = null;

  constructor(
    private organizerService: OrganizerService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.loadOrganizerWallet();
    this.loadPaymentInformation();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  loadOrganizerWallet(): void {
    this.loading = true;
    this.organizerService
      .getOrganizerWallet()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (response) => {
          console.log('Wallet Data:', response);
          this.walletData = response.data;
          this.transactions = (this.walletData?.recentTransactions || []).map(
            (transaction: RecentTransaction) => ({
              id: transaction.transactionId,
              description: transaction.description,
              date: new Date(transaction.date).toLocaleDateString('en-GB', {
                year: 'numeric',
                month: 'short',
              }),
              amount: `${transaction.amount >= 0 ? '+' : ''}${parseFloat(
                transaction.amount.toFixed(2)
              )} EGP`,
              status: transaction.status,
              type: transaction.type,
            })
          );
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

    const token =
      sessionStorage.getItem(CONSTANTS.token) ||
      localStorage.getItem(CONSTANTS.token);
    let organizerId = '';

    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        organizerId = payload.id;
      } catch (error) {
        console.error('Error decoding token:', error);
        this.errorMessage = 'Invalid token format. Please log in again.';
        this.isProcessing = false;
        return;
      }
    } else {
      this.errorMessage = 'Token not found. Please log in.';
      this.isProcessing = false;
      return;
    }
    const transferInfo = {
      organizerId: organizerId,
      type: this.paymentMethod,
      email: this.paymentFormData.email,
      accountName: this.paymentFormData.accountName,
      accountNumber: this.paymentFormData.accountNumber,
      walletPhoneNumber: this.paymentFormData.walletPhoneNumber,
    };

    this.organizerService
      .updateAndSaveTransferInfo(transferInfo)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (response) => {
          this.isProcessing = false;
          this.closePaymentDialog();
          this.showNotification('Payment information saved successfully!');
          this.loadPaymentInformation();
        },
        error: (error) => {
          this.isProcessing = false;
          this.errorMessage = 'Failed to save payment information.';
          console.error('Error saving payment info:', error);
          this.showNotification('Failed to save payment information!');
        },
      });
  }

  loadPaymentInformation(): void {
    this.loading = true;
    this.organizerService.getTransferInfo().subscribe({
      next: (response: TransferInfoResponse) => {
        const transferInfo = response.data;

        if (transferInfo) {
          this.paymentMethod =
            (transferInfo.type as 'E-Wallet' | 'InstaPay' | 'Bank') || 'Bank';
          this.paymentFormData = {
            accountNumber: transferInfo.accountNumber || '',
            accountName: transferInfo.accountName || '',
            walletPhoneNumber: transferInfo.walletPhoneNumber || '',
            email: transferInfo.email || '',
          };
          console.log('Payment Form Data after loading:', this.paymentFormData);
        } else {
          this.paymentMethod = 'Bank';
          this.paymentFormData = {
            accountNumber: '',
            accountName: '',
            walletPhoneNumber: '',
            email: '',
          };
          console.log('No transfer info found, using defaults');
        }
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load payment information.';
        console.error('Error loading payment information:', error);
        this.loading = false;
      },
    });
  }

  showNotification(message: string): void {
    const notificationContainer = document.getElementById(
      'notification-container'
    );
    const notificationElement = document.getElementById('notification');

    if (notificationContainer && notificationElement) {
      notificationElement.textContent = message;
      notificationElement.classList.remove('translate-y-full', 'opacity-0');
      setTimeout(() => {
        notificationElement.classList.add('translate-y-full', 'opacity-0');
      }, 3000);
    }
  }

  goBack(): void {
    this.location.back();
  }
}
