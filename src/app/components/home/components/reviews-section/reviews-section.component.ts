import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { heroStar } from '@ng-icons/heroicons/outline';
import { heroStarSolid } from '@ng-icons/heroicons/solid';
import { NgIcon, provideIcons, provideNgIconsConfig } from '@ng-icons/core';
import {
  matArrowBackIosNew,
  matArrowForwardIos,
} from '@ng-icons/material-icons/baseline';

@Component({
  selector: 'app-reviews-section',
  imports: [CommonModule, NgIcon],
  templateUrl: './reviews-section.component.html',
  providers: [
    provideIcons({
      heroStar,
      heroStarSolid,
      matArrowBackIosNew,
      matArrowForwardIos,
    }),
    provideNgIconsConfig({
      size: '1.5em',
    }),
  ],
})
export class ReviewsSectionComponent {
  reviews = [
    {
      name: 'Sarah Johnson',
      role: 'Music Enthusiast',
      image:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      rating: 5,
      feedback:
        "I've used many ticket booking platforms, but Evenza stands out for its ease of use and customer service. I was able to book tickets for a sold-out concert within minutes!",
    },
    {
      name: 'Michael Chen',
      role: 'Theater Lover',
      image:
        'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      rating: 5,
      feedback:
        "The seat selection feature is phenomenal. I could see exactly where I'd be sitting and the view I'd have. Made choosing the perfect seats for our anniversary show so much easier.",
    },
    {
      name: 'Michael Chen',
      role: 'Theater Lover',
      image:
        'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      rating: 5,
      feedback:
        "The seat selection feature is phenomenal. I could see exactly where I'd be sitting and the view I'd have. Made choosing the perfect seats for our anniversary show so much easier.",
    },
    {
      name: 'Michael Chen',
      role: 'Theater Lover',
      image:
        'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      rating: 5,
      feedback:
        "The seat selection feature is phenomenal. I could see exactly where I'd be sitting and the view I'd have. Made choosing the perfect seats for our anniversary show so much easier.",
    },
    {
      name: 'Alexandra Torres',
      role: 'Event Organizer',
      image:
        'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      rating: 5,
      feedback:
        'As an event organizer, Evenza has revolutionized how I sell tickets. The platform is intuitive, the analytics are helpful, and my attendees love the seamless experience.',
    },
    {
      name: 'James Wilson test ',
      role: 'Sports Fan',
      image:
        'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      rating: 4,
      feedback:
        'The mobile app is fantastic! I was able to access my tickets easily even when I had no signal at the venue entrance. The offline functionality saved me a lot of stress.',
    },
  ];

  scrollLeft(slider: HTMLElement) {
    slider.scrollBy({ left: -300, behavior: 'smooth' });
  }

  scrollRight(slider: HTMLElement) {
    slider.scrollBy({ left: 300, behavior: 'smooth' });
  }
}
