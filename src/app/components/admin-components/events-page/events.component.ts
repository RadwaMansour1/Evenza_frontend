// src/app/modules/events/events.component.ts
import { Component, OnInit } from '@angular/core';
import { EventsService, Event, TicketLevel, EventLocation } from '../../../services/admin/events.service';
import { NgIconComponent } from '@ng-icons/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


import {  ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule, NgIconComponent, FormsModule,RouterModule],
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class AdminEventsComponent implements OnInit {
  events: Event[] = [];
  filteredEvents: Event[] = [];
  searchTerm: string = '';
  isLoading = true;
  error: string | null = null;

  statuses = ['all', 'pending', 'approved', 'rejected'];
  selectedStatus = 'all';

  isEditModalOpen = false;
  selectedEvent: Event = {
    title: '', category: '',
    eventHighlights: [],
    isApproved: false,
    _id: '',
    description: '',
    date: '',
    time: '',
    location: {
      address: '',
      city: '',
      coordinates: { latitude: 0, longitude: 0 }
    },
    ticketsAvailable: [],
    isFree: false,
    imageUrl: '',
    organizerId: 0,
    status: 'pending',
    
    createdAt: '',
    updatedAt: ''
  };

  isDeleteModalOpen = false;
  eventToDelete: string | null = null;

  isApproveModalOpen = false;
  eventToApprove: string | null = null;

  constructor(private eventsService: EventsService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.isLoading = true;
    this.eventsService.getEvents().subscribe({
      next: (events) => {
        this.events = events;
        this.filteredEvents = [...events];
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load events';
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  filterEvents(): void {
    this.filteredEvents = this.events.filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(this.searchTerm.toLowerCase());
      const eventStatus = this.getEventStatus(event);
      const matchesStatus = this.selectedStatus === 'all' || eventStatus === this.selectedStatus;
      return matchesSearch && matchesStatus;
    });
  }

  openApproveModal(eventId: string): void {
    this.eventToApprove = eventId;
    this.isApproveModalOpen = true;
  }

  closeApproveModal(): void {
    this.isApproveModalOpen = false;
    this.eventToApprove = null;
  }

  confirmApprove(): void {
    if (this.eventToApprove) {
      this.approveEvent(this.eventToApprove);
      this.closeApproveModal();
    }
  }

  approveEvent(eventId: string): void {
    this.eventsService.approveEvent(eventId).subscribe({
      next: (updatedEvent) => {
        const index = this.events.findIndex(e => e._id === eventId);
        if (index !== -1) {
          this.events[index] = {
            ...updatedEvent,
            isApproved: true,
            status: 'approved'
          };
          this.toastr.success('Event approved successfully!', 'Success');
          this.filterEvents();
        }
      },
      error: (err) => {
        console.error('Failed to approve event:', err);
        this.toastr.error('Failed to approve event', 'Error');
      }
    });
  }

  updateStatus(eventId: string, newStatus: 'approved' | 'rejected'): void {
    this.eventsService.updateEventStatus(eventId, newStatus).subscribe({
      next: (updatedEvent) => {
        const index = this.events.findIndex(e => e._id === eventId);
        if (index !== -1) {
          this.events[index] = {
            ...updatedEvent,
            status: newStatus === 'approved' ? 'approved' : 'pending',
            isApproved: newStatus === 'approved'
          };
          this.filterEvents();
          this.toastr.success(`Event ${this.events[index].status} successfully!`, 'Success');
        }
      },
      error: (err) => {
        console.error('Failed to update status:', err);
        this.toastr.error('Failed to update event status', 'Error');
      }
    });
  }

  deleteEvent(eventId: string): void {
    if (confirm('Are you sure you want to delete this event?')) {
      this.eventsService.deleteEvent(eventId).subscribe({
        next: () => {
          this.events = this.events.filter(event => event._id !== eventId);
          this.filterEvents();
        },
        error: (err) => {
          console.error('Failed to delete event:', err);
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

  formatTime(timeString: string): string {
    return timeString || '--:--';
  }

  formatLocation(location: EventLocation): string {
    return `${location.address}, ${location.city}`;
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  getCheapestTicketPrice(tickets: TicketLevel[]): string {
    if (!tickets || tickets.length === 0) return 'Free';
    const cheapest = Math.min(...tickets.map(t => t.price));
    return `$${cheapest.toFixed(2)}+`;
  }

  openEditModal(event: Event): void {
    this.selectedEvent = { ...event }; // Clone the event to avoid direct mutation
    this.isEditModalOpen = true;
  }

  closeEditModal(): void {
    this.isEditModalOpen = false;
    // this.selectedEvent = null;
  }

  saveEvent(): void {
    if (this.selectedEvent) {
      this.eventsService.editEvent(this.selectedEvent._id, this.selectedEvent).subscribe({
        next: (updatedEvent) => {
          const index = this.events.findIndex(e => e._id === updatedEvent._id);
          if (index !== -1) {
            this.events[index] = updatedEvent;
            this.filterEvents();
          }
          this.closeEditModal();
          this.toastr.success('Event updated successfully!', 'Success');
        },
        error: (err) => {
          console.error('Failed to save event:', err);
          this.toastr.error('Failed to update the event. Please try again.', 'Error');
        }
      });
    }
  }

  openDeleteModal(eventId: string): void {
    this.eventToDelete = eventId;
    this.isDeleteModalOpen = true;
  }

  closeDeleteModal(): void {
    this.isDeleteModalOpen = false;
    this.eventToDelete = null;
  }

  confirmDelete(): void {
    if (this.eventToDelete) {
      this.eventsService.deleteEvent(this.eventToDelete).subscribe({
        next: () => {
          this.events = this.events.filter(event => event._id !== this.eventToDelete);
          this.filterEvents();
          this.toastr.success('Event deleted successfully!', 'Success'); // Show success notification
          this.closeDeleteModal();
        },
        error: (err) => {
          console.error('Failed to delete event:', err);
          this.toastr.error('Failed to delete the event. Please try again.', 'Error'); // Show error notification
          this.closeDeleteModal();
        }
      });
    }
  }

  // Add this helper method to determine status based on isApproved
  getEventStatus(event: Event): string {
    return event.isApproved ? 'approved' : 'pending';
  }
}