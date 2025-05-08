import { Component, OnInit } from '@angular/core';
import { OrganizerWalletService, OrganizerBalance, CreateTransactionDto } from '../../../services/admin/organizer-wallet.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-organizer-wallet',
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './organizer-wallet.component.html',
  styleUrls: ['./organizer-wallet.component.scss']
})
export class OrganizersWalletComponent implements OnInit {
  organizers: OrganizerBalance[] = [];
  loading = true;
  errorMessage = '';
  selectedOrganizer: OrganizerBalance | null = null;
  showWithdrawalModal = false;
  withdrawalForm: FormGroup;
  processingWithdrawal = false;
  withdrawalSuccess = false;

  constructor(
    private organizerWalletService: OrganizerWalletService,
    private fb: FormBuilder
  ) {
    this.withdrawalForm = this.fb.group({
      amount: ['', [Validators.required, Validators.min(1)]],
      description: ['Withdrawal', [Validators.required]],
      currency: ['EGP', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.loadOrganizers();
  }

  loadOrganizers() {
    this.loading = true;
    this.organizerWalletService.getAllOrganizersBalances().subscribe({
      next: (res) => {
        // If res is an object, convert it to an array
        this.organizers = Array.isArray(res) ? res : Object.values(res);
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load organizers.';
        this.loading = false;
      }
    });
  }

  selectOrganizer(organizer: OrganizerBalance): void {
    this.selectedOrganizer = organizer;
  }

  openWithdrawalModal(organizer: OrganizerBalance): void {
    this.selectedOrganizer = organizer;
    this.withdrawalForm.patchValue({
      amount: organizer.availableBalance > 0 ? organizer.availableBalance : '',
      description: `Withdrawal for ${organizer.name}`,
      currency: 'EGP'
    });
    this.showWithdrawalModal = true;
    this.withdrawalSuccess = false;
  }

  closeWithdrawalModal(): void {
    this.showWithdrawalModal = false;
    this.withdrawalForm.reset({
      description: 'Withdrawal',
      currency: 'EGP'
    });
  }

  processWithdrawal(): void {
    if (this.withdrawalForm.invalid || !this.selectedOrganizer) {
      return;
    }

    const transaction: CreateTransactionDto = {
      organizerId: this.selectedOrganizer.organizerId,
      description: this.withdrawalForm.value.description,
      amount: this.withdrawalForm.value.amount,
      currency: this.withdrawalForm.value.currency,
      status: 'completed'
    };

    this.processingWithdrawal = true;
    this.organizerWalletService.createTransaction(transaction).subscribe({
      next: (response) => {
        console.log('Withdrawal successful', response);
        this.processingWithdrawal = false;
        this.withdrawalSuccess = true;
        // Refresh organizer list to update balances
        this.loadOrganizers();
        // Close modal after 2 seconds
        setTimeout(() => {
          this.closeWithdrawalModal();
        }, 2000);
      },
      error: (error) => {
        console.error('Error processing withdrawal', error);
        this.processingWithdrawal = false;
        this.errorMessage = 'Failed to process withdrawal. Please try again.';
      }
    });
  }

  getTransferInfoLabel(organizer: OrganizerBalance | null): string {
    if (!organizer || !organizer.TransferInfo) {
      return 'No transfer info';
    }
    
    const info = organizer.TransferInfo;
    
    if (info.type === 'E-Wallet') {
      return `E-Wallet: ${info.walletPhoneNumber}`;
    } else if (info.type === 'InstaPay' || info.type === 'Bank') {
      return `${info.type}: ${info.accountName} (${info.accountNumber})`;
    }
    
    return 'Unknown transfer info';
  }
}