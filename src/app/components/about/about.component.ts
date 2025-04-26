import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroUser, heroCalendar, heroTicket, heroShieldCheck, heroGlobeAlt, heroHeart } from '@ng-icons/heroicons/outline';
import { AddReviewComponent } from '../add-review/add-review.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-about',
  imports: [CommonModule, NgIcon, AddReviewComponent, TranslateModule],
  templateUrl: './about.component.html',
  viewProviders:[provideIcons({heroUser, heroCalendar, heroTicket, heroShieldCheck, heroGlobeAlt, heroHeart})]
})
export class AboutComponent {
  values = [
    { key: 'user', icon: 'heroUser' },
    { key: 'quality', icon: 'heroCalendar' },
    { key: 'pricing', icon: 'heroTicket' },
    { key: 'security', icon: 'heroShieldCheck' },
    { key: 'global', icon: 'heroGlobeAlt' },
    { key: 'community', icon: 'heroHeart' },
  ];


}
