import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  ChangeDetectorRef,
  NgZone,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as L from 'leaflet';
import { GeocodingService } from '../../../services/event/geocoding.service';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroMapPin, heroCheckCircle } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-add-event',
  standalone: true,
  imports: [CommonModule, FormsModule, NgIcon],
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css'],
  providers: [
    provideIcons({
      heroMapPin,
      heroCheckCircle,
    }),
  ],
})
export class AddEventComponent implements OnInit, AfterViewInit, OnDestroy {
  // --- Form Fields ---
  eventTitle: string = '';
  description: string = '';
  eventDate: string = '';
  eventTime: string = '';
  address: string = '';
  category: string = '';
  isFreeEvent: boolean = false;
  selectedImagePreview: string | ArrayBuffer | null = null;

  // Main form location data
  latitude: number | null = 29.9792; // Default Latitude (Giza)
  longitude: number | null = 31.1342; // Default Longitude (Giza)

  // --- Ticket Data ---
  ticketTypes = [
    { level: 'Golden', price: null, quantity: null },
    { level: 'Silver', price: null, quantity: null },
    { level: 'Platinum', price: null, quantity: null },
  ];

  // --- Location Dialog Properties ---
  isLocationDialogOpen: boolean = false;
  private dialogMap: L.Map | null = null; // Initialize as null
  private dialogMarker: L.Marker | null = null; // Initialize as null
  dialogLatitude: number | null = this.latitude; // Temporary lat for dialog
  dialogLongitude: number | null = this.longitude; // Temporary lng for dialog
  locationSearchQuery: string = ''; // For the address search input

  // --- Leaflet Map for Main Form ---
  private map: L.Map | null = null; // Initialize as null
  private marker: L.Marker | null = null; // Initialize as null
  private defaultIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    iconRetinaUrl:
      'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41],
  });

  constructor(
    private cdr: ChangeDetectorRef,
    private zone: NgZone,
    private geocodingService: GeocodingService
  ) {}

  ngOnInit(): void {
    // Initialize dialog lat/lng with main form values
    this.dialogLatitude = this.latitude;
    this.dialogLongitude = this.longitude;
  }

  ngAfterViewInit(): void {
    // Initialize the main form's map here
    this.zone.runOutsideAngular(() => {
      this.initMap();
    });

    // Invalidate the main map size after the view is stable.
    setTimeout(() => {
      if (this.map) {
        this.map.invalidateSize();
      }
    }, 100);
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
      this.map = null; // Set to null after removing
      this.marker = null;
    }
    if (this.dialogMap) {
      this.dialogMap.remove();
      this.dialogMap = null; // Set to null after removing
      this.dialogMarker = null;
    }
  }

  private initMap(): void {
    // Only initialize if the map element exists and the map hasn't been initialized yet
    const mapElement = document.getElementById('eventMap');
    if (typeof window !== 'undefined' && L && mapElement && !this.map) {
      this.map = L.map(mapElement, {
        center: [this.latitude || 29.9792, this.longitude || 31.1342], // Use default if null
        zoom: 13,
        attributionControl: false, // Hide default attribution to avoid conflicts if dialog map has it
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        minZoom: 3,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(this.map);

      // Initialize marker on the main map, it will update from dialog selection
      this.marker = L.marker(
        [this.latitude || 29.9792, this.longitude || 31.1342],
        {
          icon: this.defaultIcon,
          draggable: false, // Main map marker is not draggable
        }
      ).addTo(this.map);

      // Add attribution explicitly
      L.control.attribution({ position: 'bottomright' }).addTo(this.map);
    } else if (!mapElement) {
      console.warn('Main map element #eventMap not found.');
    } else if (this.map) {
      console.log('Main map already initialized.');
    }
  }

  // Initialize map inside the dialog
  private initDialogMap(): void {
    // Only initialize if the dialog map element exists and the dialog map hasn't been initialized yet
    const dialogMapElement = document.getElementById('dialogMap');
    if (
      typeof window !== 'undefined' &&
      L &&
      dialogMapElement &&
      !this.dialogMap
    ) {
      this.dialogMap = L.map(dialogMapElement, {
        center: [
          this.dialogLatitude || 29.9792,
          this.dialogLongitude || 31.1342,
        ], // Use dialog's temp location
        zoom: 13,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        minZoom: 3,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(this.dialogMap);

      this.dialogMarker = L.marker(
        [this.dialogLatitude || 29.9792, this.dialogLongitude || 31.1342],
        {
          draggable: true,
          icon: this.defaultIcon,
        }
      ).addTo(this.dialogMap);

      // Update temporary lat/lng when dialog marker is dragged
      this.dialogMarker.on('dragend', (event) => {
        const position = event.target.getLatLng();
        this.zone.run(() => {
          // Ensure Angular updates are inside the zone
          this.dialogLatitude = parseFloat(position.lat.toFixed(6));
          this.dialogLongitude = parseFloat(position.lng.toFixed(6));
          console.log(
            'Dialog Marker Dragged:',
            this.dialogLatitude,
            this.dialogLongitude
          );
        });
      });

      // Invalidate size after dialog is visible and map is initialized
      // Use a small delay to ensure the dialog has rendered
      setTimeout(() => {
        if (this.dialogMap) {
          this.dialogMap.invalidateSize();
          console.log('Dialog map invalidated size');
        }
      }, 50); // Adjust delay if needed, crucial for map rendering in a hidden container
    } else if (!dialogMapElement) {
      console.warn('Dialog map element #dialogMap not found.');
    } else if (this.dialogMap) {
      console.log('Dialog map already initialized.');
    }
  }

  // --- Event Handlers ---
  onFileSelected(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;

    if (fileList && fileList[0]) {
      const file = fileList[0];
      const reader = new FileReader();
      reader.onload = (e) => (this.selectedImagePreview = reader.result);
      reader.readAsDataURL(file);
    } else {
      this.selectedImagePreview = null;
    }
  }

  // Location Dialog Methods
  openLocationDialog(): void {
    // Set temporary dialog location to current main form location
    this.dialogLatitude = this.latitude;
    this.dialogLongitude = this.longitude;

    this.isLocationDialogOpen = true;

    // Initialize dialog map *after* the dialog is open and in the DOM
    // Use a timeout to give the DOM a moment to update.
    setTimeout(() => {
      this.initDialogMap();
      // If dialog map was already initialized, just update its view and marker
      if (this.dialogMap && this.dialogMarker) {
        const currentLatLng = L.latLng(
          this.dialogLatitude || 29.9792,
          this.dialogLongitude || 31.1342
        );
        this.dialogMap.setView(currentLatLng, 13);
        this.dialogMarker.setLatLng(currentLatLng);
        this.dialogMap.invalidateSize();
      }
    }, 0); // A minimal delay should suffice
  }

  closeLocationDialog(): void {
    this.isLocationDialogOpen = false;
    // Optional: Clean up dialog map instance when closing to free up resources
    if (this.dialogMap) {
      this.dialogMap.remove();
      this.dialogMap = null;
      this.dialogMarker = null;
    }
    // Keeping the map instance might be faster if dialog is opened frequently,
    // just ensure invalidateSize is called on open.
  }

  // Uses browser's Geolocation API to find user's location and update dialog map
  useMyLocationInDialog(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.zone.run(() => {
            // Ensure Angular updates are inside the zone
            const currentLatLng = L.latLng(
              position.coords.latitude,
              position.coords.longitude
            );

            // Update temporary lat/lng for the dialog
            this.dialogLatitude = parseFloat(
              position.coords.latitude.toFixed(6)
            );
            this.dialogLongitude = parseFloat(
              position.coords.longitude.toFixed(6)
            );

            // Update dialog map view and marker position
            if (this.dialogMap && this.dialogMarker) {
              this.dialogMap.setView(currentLatLng, 15);
              this.dialogMarker.setLatLng(currentLatLng);
              setTimeout(() => this.dialogMap?.invalidateSize(), 50);
            }
            console.log(
              'Used My Location (in dialog):',
              this.dialogLatitude,
              this.dialogLongitude
            );
          });
        },
        (error) => {
          console.error('Error getting location:', error);
          alert(
            'Could not retrieve your location. Please ensure location services are enabled and permission is granted.'
          );
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }

  // Confirms the selected location in the dialog and updates the main form
  confirmLocation(): void {
    if (this.dialogMarker) {
      const selectedLatLng = this.dialogMarker.getLatLng();
      this.latitude = parseFloat(selectedLatLng.lat.toFixed(6));
      this.longitude = parseFloat(selectedLatLng.lng.toFixed(6));

      this.geocodingService
        .reverseGeocode(this.latitude, this.longitude)
        .subscribe((addressResult) => {
          console.log('Address Result:', addressResult);
          this.address = addressResult.display_name;
          console.log('Location Address:', this.address);
        });

      this.updateMapFromInputs();
      this.closeLocationDialog();
      console.log('Location Confirmed:', this.latitude, this.longitude);
    } else {
      alert('Please select a location on the map.');
    }
  }

  updateMapFromInputs(): void {
    if (
      this.map &&
      this.marker &&
      this.latitude != null &&
      this.longitude != null
    ) {
      const newLatLng = L.latLng(this.latitude, this.longitude);
      this.map.setView(newLatLng, this.map.getZoom() || 13); // Use current zoom or default
      this.marker.setLatLng(newLatLng);
      // Invalidate size again if the container might have changed
      setTimeout(() => this.map?.invalidateSize(), 50);
    } else if (this.map && this.marker) {
      // Handle case where lat/lng might be null (e.g., on initial load if no default)
      // Optionally remove or hide marker, or set to a default view.
      console.warn(
        'Latitude or Longitude is null, cannot update main map marker.'
      );
    }
  }

  onSubmit(): void {
    console.log('Form Submitted!');
    console.log('Event Title:', this.eventTitle);
    console.log('Description:', this.description);
    console.log('Date:', this.eventDate);
    console.log('Time:', this.eventTime);
    console.log('Address:', this.address);
    console.log('Latitude:', this.latitude); // These will now only come from the dialog
    console.log('Longitude:', this.longitude); // These will now only come from the dialog
    console.log('Category:', this.category);
    console.log('Is Free:', this.isFreeEvent);
    if (!this.isFreeEvent) {
      console.log('Tickets:', this.ticketTypes);
    }
    console.log(
      'Image Preview Data URL (or null):',
      this.selectedImagePreview ? 'Exists' : 'null'
    );
    // TODO: Implement actual form submission logic (e.g., send data to a backend service)
  }

  onCancel(): void {
    console.log('Form Cancelled');
    // Reset form fields
    this.eventTitle = '';
    this.description = '';
    this.eventDate = '';
    this.eventTime = '';
    this.address = '';
    this.category = '';
    this.isFreeEvent = false;
    this.selectedImagePreview = null;
    this.ticketTypes.forEach((t) => {
      t.price = null;
      t.quantity = null;
    });
    // Reset location to default and update main map
    this.latitude = 29.9792;
    this.longitude = 31.1342;
    this.dialogLatitude = this.latitude; // Reset dialog values too
    this.dialogLongitude = this.longitude;
    this.updateMapFromInputs(); // Update the main map display

    // Close dialog if open
    this.closeLocationDialog();
  }
}
