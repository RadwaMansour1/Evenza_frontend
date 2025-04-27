import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  NgZone,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as L from 'leaflet';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroMapPin, heroCheckCircle } from '@ng-icons/heroicons/outline';
import { GeocodingService } from '../../../../services/event/geocoding.service';

@Component({
  selector: 'app-location-picker',
  standalone: true,
  imports: [CommonModule, FormsModule, NgIcon],
  templateUrl: './location-picker.component.html',
  styleUrls: ['./location-picker.component.css'],
  providers: [
    provideIcons({
      heroMapPin,
      heroCheckCircle,
    }),
  ],
})
export class LocationPickerComponent
  implements OnInit, AfterViewInit, OnDestroy, OnChanges
{
  @Input() initialLatitude: number | null = 29.9792; // Default Latitude (Giza)
  @Input() initialLongitude: number | null = 31.1342; // Default Longitude (Giza)
  @Output() locationSelected = new EventEmitter<{
    latitude: number;
    longitude: number;
    address: string;
    city: string;
  }>();

  // --- Location Dialog Properties ---
  isLocationDialogOpen: boolean = false;
  private dialogMap: L.Map | null = null;
  private dialogMarker: L.Marker | null = null;
  dialogLatitude: number | null = this.initialLatitude; //  lat for dialog
  dialogLongitude: number | null = this.initialLongitude; // lng for dialog

  private displayMap: L.Map | null = null; // Initialize as null
  private displayMarker: L.Marker | null = null; // Initialize as null

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
    private zone: NgZone,
    private geocodingService: GeocodingService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    // Update internal dialog location if initial location changes from parent
    if (changes['initialLatitude'] || changes['initialLongitude']) {
      this.dialogLatitude = this.initialLatitude;
      this.dialogLongitude = this.initialLongitude;
      // Also update the display map if it exists
      if (this.displayMap && this.displayMarker) {
        const newLatLng = L.latLng(
          this.initialLatitude || 29.9792,
          this.initialLongitude || 31.1342
        );
        this.displayMap.setView(newLatLng, this.displayMap.getZoom() || 13);
        this.displayMarker.setLatLng(newLatLng);
        setTimeout(() => this.displayMap?.invalidateSize(), 50);
      }
    }
  }

  ngOnInit(): void {
    // Initialize dialog lat/lng with initial values
    this.dialogLatitude = this.initialLatitude;
    this.dialogLongitude = this.initialLongitude;
  }

  ngAfterViewInit(): void {
    // Initialize the display map here
    this.zone.runOutsideAngular(() => {
      this.initDisplayMap();
    });

    // Invalidate the display map size after the view is stable.
    setTimeout(() => {
      if (this.displayMap) {
        this.displayMap.invalidateSize();
      }
    }, 100);
  }

  ngOnDestroy(): void {
    if (this.displayMap) {
      this.displayMap.remove();
      this.displayMap = null; // Set to null after removing
      this.displayMarker = null;
    }
    if (this.dialogMap) {
      this.dialogMap.remove();
      this.dialogMap = null; // Set to null after removing
      this.dialogMarker = null;
    }
  }

  private initDisplayMap(): void {
    // Only initialize if the map element exists and the map hasn't been initialized yet
    const mapElement = document.getElementById('displayMap'); // Changed ID
    if (typeof window !== 'undefined' && L && mapElement && !this.displayMap) {
      this.displayMap = L.map(mapElement, {
        center: [
          this.initialLatitude || 29.9792,
          this.initialLongitude || 31.1342,
        ], // Use default if null
        zoom: 13,
        attributionControl: false,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        minZoom: 3,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(this.displayMap);

      // Initialize marker on the display map
      this.displayMarker = L.marker(
        [this.initialLatitude || 29.9792, this.initialLongitude || 31.1342],
        {
          icon: this.defaultIcon,
          draggable: false, // Disable marker dragging
        }
      ).addTo(this.displayMap);

      // Add attribution explicitly
      L.control.attribution({ position: 'bottomright' }).addTo(this.displayMap);
    } else if (!mapElement) {
      console.warn('Display map element #displayMap not found.');
    } else if (this.displayMap) {
      console.log('Display map already initialized.');
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

  // Location Dialog Methods
  openLocationDialog(): void {
    // Set temporary dialog location to current initial location (or last selected)
    this.dialogLatitude = this.initialLatitude;
    this.dialogLongitude = this.initialLongitude;

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
    //  Clean up dialog map instance when closing to free up resources
    if (this.dialogMap) {
      this.dialogMap.remove();
      this.dialogMap = null;
      this.dialogMarker = null;
    }
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

  confirmLocation(): void {
    if (
      this.dialogMarker &&
      this.dialogLatitude != null &&
      this.dialogLongitude != null
    ) {
      this.geocodingService
        .reverseGeocode(this.dialogLatitude, this.dialogLongitude)
        .subscribe((addressResult) => {
          console.log('Address Result:', addressResult);
          const selectedAddress = addressResult.display_name;
          const selectedCity = addressResult.address.city;
          console.log('Location Address:', selectedAddress);

          // Emit the selected location data to the parent
          this.locationSelected.emit({
            latitude: this.dialogLatitude!,
            longitude: this.dialogLongitude!,
            address: selectedAddress,
            city: selectedCity,
          });
        });

      // Update the display map marker if it exists
      if (this.displayMap && this.displayMarker) {
        const newLatLng = L.latLng(this.dialogLatitude, this.dialogLongitude);
        this.displayMap.setView(newLatLng, this.displayMap.getZoom() || 13);
        this.displayMarker.setLatLng(newLatLng);
        setTimeout(() => this.displayMap?.invalidateSize(), 50);
      }

      this.closeLocationDialog();
      console.log(
        'Location Confirmed:',
        this.dialogLatitude,
        this.dialogLongitude
      );
    } else {
      alert('Please select a location on the map.');
    }
  }

  // This method is now private and called internally if the display map exists
  private updateDisplayMapFromInputs(): void {
    if (
      this.displayMap &&
      this.displayMarker &&
      this.initialLatitude != null &&
      this.initialLongitude != null
    ) {
      const newLatLng = L.latLng(this.initialLatitude, this.initialLongitude);
      this.displayMap.setView(newLatLng, this.displayMap.getZoom() || 13); // Use current zoom or default
      this.displayMarker.setLatLng(newLatLng);
      // Invalidate size again if the container might have changed
      setTimeout(() => this.displayMap?.invalidateSize(), 50);
    } else if (this.displayMap && this.displayMarker) {
      // Handle case where lat/lng might be null (e.g., on initial load if no default)
      console.warn(
        'Latitude or Longitude is null, cannot update display map marker.'
      );
    }
  }
}
