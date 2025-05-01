import { Component, OnInit } from '@angular/core';
import { OrganizerService } from '../../../services/organizer/organizer.service';
import { Router } from '@angular/router';
import { OrganizerDashboardComponent } from "../organizer-dashboard/organizer-dashboard.component";
import { IdVerificationComponent } from "../id-verification/id-verification.component";
import { WaitTillApprovedComponent } from "../wait-till-approved/wait-till-approved.component";

@Component({
  selector: 'app-organizer-home',
  imports: [OrganizerDashboardComponent, IdVerificationComponent, WaitTillApprovedComponent],
  templateUrl: './organizer-home.component.html',
})
export class OrganizerHomeComponent implements OnInit {
  organizerStatus: string = '';
  isUploadDocument: boolean = false;
  documentStatus: string = '';

  constructor(
    private organizerService: OrganizerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getOrganizerStatus();
  }

  getOrganizerStatus(): void {
    this.organizerService.getOrganizerStatus().subscribe({
      next: (response) => {
        console.log(response.data);
        this.organizerStatus = response.data.status;
        this.isUploadDocument = response.data.isDocumentUploaded;
        this.documentStatus = response.data.documentStatus;
      },
      error: (err) => {
        console.error('Error creating event', err);
      },
    });
  }
}
