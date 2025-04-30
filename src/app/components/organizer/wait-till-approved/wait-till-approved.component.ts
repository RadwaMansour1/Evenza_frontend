import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroClock } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-wait-till-approved',
  imports: [CommonModule, NgIcon],
  templateUrl: './wait-till-approved.component.html',
  styleUrls: ['./wait-till-approved.component.css'],
  providers: [provideIcons({ heroClock })],
})
export class WaitTillApprovedComponent implements OnInit, OnDestroy {
  progressPercent = 10;

  nextSteps = [
    "You'll receive an email notification",
    'Your organizer account will be fully activated',
    "You'll gain access to all organizer features",
  ];

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
   
  }
}
