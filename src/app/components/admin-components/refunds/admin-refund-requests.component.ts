import { Component, OnInit } from '@angular/core';
import { RefundsRequestsService } from '../../../services/refundRequests/refundRequests.service';
import { RefundService } from '../../../services/refund/refund.service';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-refund-requests',
  imports: [CommonModule],
  templateUrl: './admin-refund-requests.component.html',
  styleUrls: ['./admin-refund-requests.component.scss']
})
export class AdminRefundRequestsComponent implements OnInit {
  
  refundRequests: any[] = [];
  isLoading = true;
  isApproveModalOpen = false;
  selectedRequestId: string | null = null;
  selectedRequest: any = null;
  
  constructor(
    private refundsRequestsService: RefundsRequestsService,
    private refundService: RefundService,
    private toastr: ToastrService
  ) {}
  
  ngOnInit(): void {
    this.loadRefundRequests();
  }
  
  loadRefundRequests() {
    this.isLoading = true;
    this.refundsRequestsService.getRefundsRequests().subscribe({
      next: (res) => {
        this.refundRequests = res.data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading refund requests:', err);
        this.isLoading = false;
        this.toastr.error('Failed to load refund requests');
      }
    });
  }
  
  openApproveModal(requestId: string) {
    this.selectedRequestId = requestId;
    this.selectedRequest = this.refundRequests.find(req => req._id === requestId);
    this.isApproveModalOpen = true;
  }
  
  closeApproveModal() {
    this.isApproveModalOpen = false;
    this.selectedRequestId = null;
    this.selectedRequest = null;
  }
  
  confirmApproveRefund() {
    if (!this.selectedRequestId) return;
    
    this.refundsRequestsService.approveWalletRefund(this.selectedRequestId).subscribe({
      next: (res) => {
        this.toastr.success('Refund approved successfully!');
        this.loadRefundRequests(); // Reload to get updated status
        this.closeApproveModal();
      },
      error: (err) => {
        this.toastr.error(err.error?.message || 'Failed to approve refund');
        this.closeApproveModal();
      }
    });
  }
  
  // If you need to implement original payment refund method
  approveOriginalRefund(requestId: string) {
    const request = this.refundRequests.find(req => req._id === requestId);
    if (!request) return;
    
    this.refundService.refundOriginal(
      request.paymentId, 
      request.refundAmount, 
      request.ticketId, 
      request.reason
    ).subscribe({
      next: (res) => {
        this.toastr.success('Original payment refunded successfully!');
        this.loadRefundRequests();
      },
      error: (err) => {
        this.toastr.error(err.error?.message || 'Failed to process refund');
      }
    });
  }
}