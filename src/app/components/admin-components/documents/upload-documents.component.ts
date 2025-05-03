import { Component, OnInit } from '@angular/core';
import { UploadDocumentsService } from '../../../services/admin/upload-documents.service';
import { UsersService } from '../../../services/admin/users.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgIconsModule } from '@ng-icons/core';
import { 
  heroMagnifyingGlass, 
  heroCheckCircle, 
  heroXMark, 
  heroEye, 
  heroDocumentMagnifyingGlass 
} from '@ng-icons/heroicons/outline';

interface Document {
  _id: string;
  organizerId: string;
  organizerName?: string;
  nationalIdImage: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  updatedAt?: string;
}

@Component({
  selector: 'app-upload-documents',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgIconsModule
  ],
  templateUrl: './upload-documents.component.html',
  styleUrls: ['./upload-documents.component.scss']
})
export class UploadDocumentsComponent implements OnInit {
  documents: Document[] = [];
  filteredDocuments: Document[] = [];
  selectedDocument: Document | null = null;
  isLoading: boolean = true;
  error: string | null = null;
  searchTerm: string = '';
  selectedStatus: string = 'all';
  
  // Modal states
  isViewModalOpen: boolean = false;
  isApproveModalOpen: boolean = false;
  isRejectModalOpen: boolean = false;
  selectedDocumentId: string | null = null;
  rejectionReason: string = '';

  constructor(
    private uploadDocService: UploadDocumentsService,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.loadDocuments();
  }

  loadDocuments() {
    this.isLoading = true;
    this.error = null;
    
    this.uploadDocService.getAllDocuments().subscribe({
      next: (res: any) => {
        const docs = res.data || [];

        // Fetch organizer names for each document
        const fetchOrganizerNames = docs.map(async (doc: any) => {
          try {
            const user = await this.usersService.getUserById(doc.organizerId).toPromise();
            return { 
              ...doc, 
              organizerName: user ? `${user.firstName} ${user.lastName}` : 'Unknown'
            };
          } catch (err) {
            console.error('Failed to fetch user', err);
            return { ...doc, organizerName: 'Unknown' };
          }
        });

        Promise.all(fetchOrganizerNames).then((docsWithNames) => {
          this.documents = docsWithNames;
          this.filteredDocuments = [...this.documents];
          this.isLoading = false;
        });
      },
      error: (err) => {
        this.error = 'Failed to load documents. Please try again.';
        this.isLoading = false;
        console.error('Error loading documents:', err);
      }
    });
  }

  filterDocuments() {
    let filtered = [...this.documents];
    
    // Filter by search term
    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase().trim();
      filtered = filtered.filter(doc => 
        doc.organizerName?.toLowerCase().includes(term)
      );
    }
    
    // Filter by status
    if (this.selectedStatus !== 'all') {
      filtered = filtered.filter(doc => doc.status === this.selectedStatus);
    }
    
    this.filteredDocuments = filtered;
  }

  resetFilters() {
    this.searchTerm = '';
    this.selectedStatus = 'all';
    this.filteredDocuments = [...this.documents];
  }

  getStatusClass(status: string | undefined): string {
    if (!status) return '';
    
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  // View document details
  openViewModal(document: Document) {
    this.selectedDocument = document;
    this.isViewModalOpen = true;
  }

  closeViewModal() {
    this.isViewModalOpen = false;
    this.selectedDocument = null;
  }

  // Approve document
  openApproveModal(id: string | undefined) {
    if (!id) return;
    this.selectedDocumentId = id;
    this.isApproveModalOpen = true;
  }

  closeApproveModal() {
    this.isApproveModalOpen = false;
    this.selectedDocumentId = null;
  }

  confirmApprove() {
    if (!this.selectedDocumentId) return;
    
    this.uploadDocService.approveDocument(this.selectedDocumentId).subscribe({
      next: () => {
        // Update the local state
        this.documents = this.documents.map(doc => 
          doc._id === this.selectedDocumentId ? { ...doc, status: 'approved' } : doc
        );
        this.filterDocuments();
        this.closeApproveModal();
        
        // Close view modal if open
        if (this.isViewModalOpen && this.selectedDocument?._id === this.selectedDocumentId) {
          this.selectedDocument = { 
            ...this.selectedDocument, 
            status: 'approved' 
          };
        }
      },
      error: (err) => {
        console.error('Error approving document:', err);
        this.error = 'Failed to approve document. Please try again.';
      }
    });
  }

  // Reject document
  openRejectModal(id: string | undefined) {
    if (!id) return;
    this.selectedDocumentId = id;
    this.rejectionReason = '';
    this.isRejectModalOpen = true;
  }

  closeRejectModal() {
    this.isRejectModalOpen = false;
    this.selectedDocumentId = null;
    this.rejectionReason = '';
  }

  confirmReject() {
    if (!this.selectedDocumentId) return;
    
    this.uploadDocService.rejectDocument(
      this.selectedDocumentId,
      // this.rejectionReason
      
      
    ).subscribe({
      next: () => {
        // Update the local state
        this.documents = this.documents.map(doc => 
          doc._id === this.selectedDocumentId ? { ...doc, status: 'rejected' } : doc
        );
        this.filterDocuments();
        this.closeRejectModal();
        
        // Close view modal if open
        if (this.isViewModalOpen && this.selectedDocument?._id === this.selectedDocumentId) {
          this.selectedDocument = { 
            ...this.selectedDocument, 
            status: 'rejected' 
          };
        }
      },
      error: (err) => {
        console.error('Error rejecting document:', err);
        this.error = 'Failed to reject document. Please try again.';
      }
    });
  }
}