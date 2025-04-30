import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  heroMapPin,
  heroCheckCircle,
  heroXMark,
} from '@ng-icons/heroicons/outline';
import { CustomAlertComponent } from '../../shared/custom-alert/custom-alert.component';
import { LocationPickerComponent } from './location-picker/location-picker.component';
import { CONSTANTS } from '../../../constants';
import { OrganizerService } from '../../../services/organizer/organizer.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-add-event',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgIcon,
    CustomAlertComponent,
    LocationPickerComponent,
    RouterLink,
  ],
  templateUrl: './add-event.component.html',
  providers: [
    provideIcons({
      heroMapPin,
      heroCheckCircle,
      heroXMark,
    }),
  ],
})
export class AddEventComponent {
  // --- Form Fields ---
  eventTitle: string = '';
  description: string = '';
  eventDate: string = '';
  eventTime: string = '';
  address: string = ''; // This will be updated by the LocationPicker
  city: string = ''; // This will be updated by the LocationPicker
  category: string = '';
  isFreeEvent: boolean = false;
  selectedImagePreview: string | ArrayBuffer | null = null;
  selectedImageFile: File | null = null;
  latitude: number | null = 29.9792; // Default Latitude (Giza) - Passed to LocationPicker
  longitude: number | null = 31.1342; // Default Longitude (Giza) - Passed to LocationPicker

  // --- Ticket Data ---
  ticketTypes = [
    { level: 'Silver', price: null, quantity: null },
    { level: 'Golden', price: null, quantity: null },
    { level: 'Platinum', price: null, quantity: null },
  ];

  currentHighlight: string = ''; // Holds the value of the highlight input field
  eventHighlights: string[] = []; // Holds the list of added highlights

  // alert
  showAlert: boolean = false;
  alertMessage: string = '';
  alertType: any = 'success';

  constructor(private organizerService: OrganizerService) {
    console.log(sessionStorage.getItem(CONSTANTS.token));
    let token = sessionStorage.getItem(CONSTANTS.token);
    const payload = this.decodeToken(token!);
    console.log(payload);
  }

  // handle on select image
  onFileSelected(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;

    if (fileList && fileList[0]) {
      const file = fileList[0];
      this.selectedImageFile = file;
      const reader = new FileReader();
      reader.onload = (e) => (this.selectedImagePreview = reader.result);
      reader.readAsDataURL(file);
    } else {
      this.selectedImagePreview = null;
      this.selectedImageFile = null;
    }
  }

  // Method to add a highlight
  addHighlight(): void {
    if (this.currentHighlight.trim()) {
      this.eventHighlights.push(this.currentHighlight.trim());
      this.currentHighlight = '';
    }
    // console.log(this.eventHighlights);
  }

  // Method to remove a highlight by index
  removeHighlight(index: number): void {
    this.eventHighlights.splice(index, 1);
  }

  //  handle location data emitted from LocationPickerComponent
  handleLocationSelected(locationData: {
    latitude: number;
    longitude: number;
    address: string;
    city: string;
  }): void {
    this.latitude = locationData.latitude;
    this.longitude = locationData.longitude;
    this.address = locationData.address;
    this.city = locationData.city;
    console.log('Location received from picker:', locationData);
  }

  onSubmit(): void {
    if (this.selectedImageFile == null) {
      this.alertMessage = 'Please select an image';
      this.showAlert = true;
      this.alertType = 'error';
      return;
    }
    if (
      this.latitude == null ||
      this.longitude == null ||
      this.address === ''
    ) {
      this.alertMessage = 'Please select a location for the event.';
      this.showAlert = true;
      this.alertType = 'error';
      return; // Prevent form submission if no location
    }

    const formData = new FormData();
    formData.append('title', this.eventTitle);
    formData.append('description', this.description);
    formData.append('date', this.eventDate);
    formData.append('time', this.eventTime);
    formData.append('address', this.address);
    formData.append('city', this.city);
    formData.append('category', this.category);
    formData.append('isFree', String(this.isFreeEvent)); // Convert to string if boolean
    formData.append('ticketsAvailable', JSON.stringify(this.ticketTypes)); // Convert array to string
    formData.append('latitude', String(this.latitude)); // Convert number to string
    formData.append('longitude', String(this.longitude)); // Convert number to string
    formData.append('file', this.selectedImageFile as Blob);
    formData.append('eventHighlights', JSON.stringify(this.eventHighlights));

    this.organizerService.addEvent(formData).subscribe({
      next: (response) => {
        console.log('Event created successfully', response);
        this.alertMessage = 'Event created successfully';
        this.showAlert = true;
        this.onCancel();
      },
      error: (err) => {
        this.alertMessage =
          'Sorry, we encountered an issue. Please try again later.';
        this.showAlert = true;
        this.alertType = 'error';
        console.error('Error creating event', err);
      },
    });
  }

  onCancel(): void {
    console.log('Form Cancelled');
    this.eventTitle = '';
    this.description = '';
    this.eventDate = '';
    this.eventTime = '';
    this.address = '';
    this.city = '';
    this.category = '';
    this.isFreeEvent = false;
    this.selectedImagePreview = null;
    this.selectedImageFile = null; // Reset file too
    this.ticketTypes.forEach((t) => {
      t.price = null;
      t.quantity = null;
    });
    this.latitude = 29.9792;
    this.longitude = 31.1342;
    this.currentHighlight = '';
    this.eventHighlights = [];
  }

  private decodeToken(token: string): any {
    if (!token || typeof token !== 'string' || token.split('.').length !== 3) {
      console.error('Invalid token format', token);
      return null;
    }
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (error) {
      console.error('Error decoding token', error);
      return null;
    }
  }
}
