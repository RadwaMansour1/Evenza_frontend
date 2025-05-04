import { Component, OnInit } from '@angular/core';
import { OrganizerWalletService } from '../../../services/admin/organizer-wallet.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgIconComponent } from '@ng-icons/core';

@Component({
  selector: 'app-organizers-wallet',
  imports: [CommonModule, FormsModule, NgIconComponent,ReactiveFormsModule],
  templateUrl: './organizer-wallet.component.html',
  styleUrls: ['./organizer-wallet.component.scss']
})
export class OrganizersWalletComponent implements OnInit {
  walletData: any;
  transferInfo: any;
  isLoading = true;
  isTransferInfoLoading = true;
  showTransferForm = false;
  showWithdrawForm = false;
  withdrawAmount = 0;
  maxWithdrawAmount = 0;

  transferForm: FormGroup;
  withdrawForm: FormGroup;

  transferTypes = ['E-Wallet', 'InstaPay', 'Bank'];
  selectedTransferType = 'E-Wallet';

  constructor(
    private walletService: OrganizerWalletService,
    private fb: FormBuilder
  ) {
    this.transferForm = this.fb.group({
      type: ['E-Wallet', Validators.required],
      walletPhoneNumber: [''],
      accountNumber: [''],
      accountName: [''],
      email: ['', [Validators.email]]
    });

    this.withdrawForm = this.fb.group({
      amount: [0, [Validators.required, Validators.min(1)]],
      description: ['Withdrawal request', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadWalletData();
    this.loadTransferInfo();
  }

  loadWalletData(): void {
    this.isLoading = true;
    this.walletService.getWallet().subscribe({
      next: (data) => {
        this.walletData = data;
        this.maxWithdrawAmount = data.availableBalance;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading wallet data:', err);
        this.isLoading = false;
      }
    });
  }

  loadTransferInfo(): void {
    this.isTransferInfoLoading = true;
    this.walletService.getTransferInfo().subscribe({
      next: (data) => {
        this.transferInfo = data;
        if (data) {
          this.selectedTransferType = data.type;
          this.updateTransferForm(data);
        }
        this.isTransferInfoLoading = false;
      },
      error: (err) => {
        console.error('Error loading transfer info:', err);
        this.isTransferInfoLoading = false;
      }
    });
  }

  updateTransferForm(data: any): void {
    this.transferForm.patchValue({
      type: data.type,
      walletPhoneNumber: data.walletPhoneNumber || '',
      accountNumber: data.accountNumber || '',
      accountName: data.accountName || '',
      email: data.email || ''
    });
  }

  onTransferTypeChange(): void {
    this.selectedTransferType = this.transferForm.get('type')?.value;
  }

  submitTransferInfo(): void {
    if (this.transferForm.invalid) return;

    const formData = this.transferForm.value;
    this.walletService.updateTransferInfo(formData).subscribe({
      next: (data) => {
        this.transferInfo = data;
        this.showTransferForm = false;
        this.loadTransferInfo();
      },
      error: (err) => {
        console.error('Error updating transfer info:', err);
      }
    });
  }

  submitWithdrawal(): void {
    if (this.withdrawForm.invalid || this.withdrawForm.value.amount > this.maxWithdrawAmount) return;

    const formData = this.withdrawForm.value;
    this.walletService.createTransaction({
      organizerId: 'current-organizer-id', // This should come from auth service
      description: formData.description,
      amount: formData.amount,
      status: 'pending'
    }).subscribe({
      next: () => {
        this.showWithdrawForm = false;
        this.loadWalletData();
        this.withdrawForm.reset({
          amount: 0,
          description: 'Withdrawal request'
        });
      },
      error: (err) => {
        console.error('Error creating withdrawal:', err);
      }
    });
  }

  formatCurrency(amount: number): string {
    return amount.toLocaleString('en-EG', {
      style: 'currency',
      currency: 'EGP',
      minimumFractionDigits: 2
    });
  }
}