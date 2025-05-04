import { Component, NgModule, OnInit } from '@angular/core';
import { ReviewService, Review } from '../../../services/admin/review.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgIconComponent } from '@ng-icons/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reviews',
  imports: [CommonModule,RouterModule,FormsModule,NgIconComponent],
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
})
export class ReviewComponent implements OnInit {
  reviews: Review[] = [];
  filteredReviews: any[] = []; // what is actually shown
  selectedFilter: 'all' | 'pending' | 'approved' = 'all';
  isDeleteModalOpen: boolean = false;
  reviewToDelete: Review | null = null;

  constructor(private reviewService: ReviewService, private toastr: ToastrService ) {}

  ngOnInit(): void {
    this.fetchReviews();
  }

  fetchReviews() {
    this.reviewService.getAllReviews().subscribe({
      next: (reviews) =>{ this.reviews = reviews;
       this.applyFilter();
      },
      error: (err) => console.error('Failed to load reviews:', err)
    });
  }
  applyFilter() {
    if (this.selectedFilter === 'pending') {
      this.filteredReviews = this.reviews.filter(r => !r.isVisible);
    } else if (this.selectedFilter === 'approved') {
      this.filteredReviews = this.reviews.filter(r => r.isVisible);
    } else {
      this.filteredReviews = [...this.reviews]; // All
    }
  }

  onFilterChange(filter: 'all' | 'pending' | 'approved') {
    this.selectedFilter = filter;
    this.applyFilter();
  }

  getStatusLabel(review: any) {
    if (review.isVisible) {
      return { label: 'Approved', color: 'bg-green-100 text-green-700' };
    } else {
      return { label: 'Pending', color: 'bg-yellow-100 text-yellow-700' };
    }
  }
  approveReview(review: Review) {
    this.reviewService.approveReview(review._id).subscribe({
      next: () => {
        review.isVisible = true;
        this.applyFilter();
      },
      error: (err) => console.error('Failed to approve review:', err)
    });
  }
  deleteReview(review: Review) {
    this.reviewService.deleteReview(review._id).subscribe({
      next: () => {
        this.reviews = this.reviews.filter(r => r._id !== review._id);
        this.applyFilter();
      },
      error: (err) => console.error('Failed to delete review:', err)
    });
  }
  openDeleteModal(review: Review) {
    this.isDeleteModalOpen = true;
    this.reviewToDelete = review;
  }

  closeDeleteModal() {
    this.isDeleteModalOpen = false;
    this.reviewToDelete = null;
  }

  confirmDelete() {
    if (this.reviewToDelete) {
      this.deleteReview(this.reviewToDelete);
      this.toastr.success('Review deleted successfully!');
      this.closeDeleteModal();
    }
  }
}
