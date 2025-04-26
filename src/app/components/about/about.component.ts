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
  teamMembers = [
    {
      name: "Radwa Mansour",
      role: "CEO & Founder",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop",
    },
    {
      name: "Asmaa Omar",
      role: "CEO & Founder",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop",
    },
    {
      name: "Ahmed Mostafa",
      role: "CEO & Founder",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop",
    },
    {
      name: "Omar Essam",
      role: "CEO & Founder",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop",
    },
    {
      name: "Hassan Mohamed",
      role: "CEO & Founder",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop",
    }
  ];


  values = [
    { key: 'user', icon: 'heroUser' },
    { key: 'quality', icon: 'heroCalendar' },
    { key: 'pricing', icon: 'heroTicket' },
    { key: 'security', icon: 'heroShieldCheck' },
    { key: 'global', icon: 'heroGlobeAlt' },
    { key: 'community', icon: 'heroHeart' },
  ];



}
