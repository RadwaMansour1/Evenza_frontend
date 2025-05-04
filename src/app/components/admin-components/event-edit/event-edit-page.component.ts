import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventsService, Event } from '../../../services/admin/events.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { NgIconComponent } from '@ng-icons/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-event-edit-page',
    imports: [CommonModule,NgIconComponent,FormsModule],
  standalone: true,
  templateUrl: './event-edit-page.component.html',
  styleUrls: ['./event-edit-page.component.scss'],
  
})
export class EventEditPageComponent implements OnInit {
  event: Event | null = null;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private eventsService: EventsService,
    private toastr: ToastrService,
    public router: Router
  ) {}

  ngOnInit(): void {
    console.log('ActivatedRoute snapshot:', this.route.snapshot); // Debugging log
    const eventId = this.route.snapshot.paramMap.get('id');
    console.log('Event ID from route:', eventId); // Debugging log
    if (eventId) {
      this.loadEvent(eventId);
    } else {
      console.error('No event ID provided in the route');
      this.toastr.error('Invalid event ID.', 'Error');
      this.router.navigate(['/admin/events']); // Redirect to events list
    }
  }

  loadEvent(eventId: string): void {
  console.log('Loading event with ID:', eventId); // Debugging log
  this.isLoading = true;
  this.eventsService.getEventById(eventId).subscribe({
    next: (event) => {
      console.log('Loaded event:', event); // Debugging log
      this.event = event;
      this.isLoading = false;
    },
    error: (err) => {
      console.error('Failed to load event:', err); // Debugging log
      this.toastr.error('Failed to load the event. Please try again.', 'Error');
      this.isLoading = false;
    }
  });
}

  saveEvent(): void {
    if (this.event) {
      this.eventsService.editEvent(this.event._id, this.event).subscribe({
        next: () => {
          this.toastr.success('Event updated successfully!', 'Success');
          this.router.navigate(['/events']); // Navigate back to the events list
        },
        error: (err) => {
          console.error('Failed to save event:', err);
          this.toastr.error('Failed to update the event. Please try again.', 'Error');
        }
      });
    }
  }
}