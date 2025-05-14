// src/app/modules/bookings/bookings.component.ts
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BookingsService, Booking } from '../../../services/admin/bookings.service';
import { UsersService } from '../../../services/admin/users.service';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgIconComponent } from '@ng-icons/core';

@Component({
  selector: 'app-bookings',
  standalone: true,
  imports: [CommonModule,FormsModule,NgIconComponent],
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss']
})
export class BookingsComponent implements OnInit {

  bookings: Booking[] = [];
  filteredBookings: Booking[] = [];
  searchTerm: string = '';
  isLoading = true;
  error: string | null = null;

  statuses = ['all', 'pending', 'confirmed', 'cancelled', 'refunded'];
  selectedStatus = 'all';

  eventCache = new Map<string, string>();

  constructor(
    private bookingsService: BookingsService,
    private usersService: UsersService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadBookings();
  }

  loadBookings(): void {
    this.isLoading = true;
    this.bookingsService.getBookings().subscribe({
      next: (bookings) => {
        // Create an array of user detail requests
        const userRequests = bookings
          .filter(booking => booking.userId?._id)
          .map(booking =>
            this.usersService.getUserById(booking.userId!._id).pipe(
              map(user => ({
                bookingId: booking._id,
                user
              }))
            )
          );

        if (userRequests.length) {
          forkJoin(userRequests).subscribe({
            next: (userDetails) => {
              // Populate bookings with user details
              this.bookings = bookings.map(booking => {
                const userDetail = userDetails.find(detail => detail.bookingId === booking._id);
                if (userDetail && booking.userId) {
                  return {
                    ...booking,
                    userId: {
                      ...booking.userId,
                      _id: booking.userId._id || '', // Ensure _id is always a string
                      firstName: userDetail.user.firstName,
                      lastName: userDetail.user.lastName,
                      email: userDetail.user.email
                    }
                  };
                }
                return booking;
              });
              this.filteredBookings = [...this.bookings];
              this.isLoading = false;
            },
            error: (err) => {
              console.error('Error fetching user details:', err);
              this.bookings = bookings;
              this.filteredBookings = [...bookings];
              this.isLoading = false;
            }
          });
        } else {
          this.bookings = bookings;
          this.filteredBookings = [...bookings];
          this.isLoading = false;
        }
      },
      error: (err) => {
        this.error = 'Failed to load bookings';
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  filterBookings(): void {
    this.filteredBookings = this.bookings.filter(booking => {
      const matchesSearch =
        (booking.userId?.firstName?.toLowerCase().includes(this.searchTerm.toLowerCase()) || '') ||
        (booking.userId?.lastName?.toLowerCase().includes(this.searchTerm.toLowerCase()) || '') ||
        (booking.userId?.email?.toLowerCase().includes(this.searchTerm.toLowerCase()) || '') ||
        (booking.orderDetails[0]?.level?.toLowerCase().includes(this.searchTerm.toLowerCase()) || '');

      const matchesStatus = this.selectedStatus === 'all' || booking.status === this.selectedStatus;

      return matchesSearch && matchesStatus;
    });
  }

  updateStatus(bookingId: string, newStatus: string): void {
    this.bookingsService.updateBookingStatus(bookingId, newStatus).subscribe({
      next: (updatedBooking) => {
        const index = this.bookings.findIndex(b => b._id === bookingId);
        if (index !== -1) {
          this.bookings[index] = updatedBooking;
          this.filterBookings();
        }
      },
      error: (err) => {
        console.error('Failed to update booking status:', err);
      }
    });
  }

  deleteBooking(bookingId: string): void {
    if (confirm('Are you sure you want to delete this booking?')) {
      this.bookingsService.deleteBooking(bookingId).subscribe({
        next: () => {
          this.bookings = this.bookings.filter(booking => booking._id !== bookingId);
          this.filterBookings();
        },
        error: (err) => {
          console.error('Failed to delete booking:', err);
        }
      });
    }
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'EGP',
      minimumFractionDigits: 2
    }).format(amount);
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'refunded': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  getTicketType(booking: Booking): string {
    return booking.orderDetails[0]?.level || 'Unknown';
  }

  getEventName(booking: Booking): string {
    // Now directly accessible from the populated data
    const event = booking.orderDetails[0]?.eventId;
    return typeof event === 'object' && event?.title ? event.title : 'Event not found';
  }
}
