import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroUser, heroCalendar, heroTicket, heroShieldCheck, heroGlobeAlt, heroHeart } from '@ng-icons/heroicons/outline';
import { AddReviewComponent } from '../add-review/add-review.component';

@Component({
  selector: 'app-about',
  imports: [CommonModule, NgIcon, AddReviewComponent],
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
    {
      title: "User-Focused Experience",
      description: "We put our users first in everything we do, creating intuitive experiences that make booking events simple and enjoyable.",
      icon: "heroUser"
    },
    {
      title: "Quality Events",
      description: "We carefully curate and verify all events on our platform to ensure they meet our high standards of quality and authenticity.",
      icon: "heroCalendar"
    },
    {
      title: "Transparent Pricing",
      description: "We believe in clear, upfront pricing with no hidden fees, so you always know exactly what you're paying for.",
      icon: "heroTicket"
    },
    {
      title: "Security & Trust",
      description: "Your security is paramount. We use industry-leading encryption and fraud detection to keep your data and transactions safe.",
      icon: "heroShieldCheck"
    },
    {
      title: "Global Perspective",
      description: "We embrace diversity and inclusion, showcasing events from cultures and communities around the world.",
      icon: "heroGlobeAlt"
    },
    {
      title: "Community Support",
      description: "We donate a portion of our proceeds to support arts education and cultural programs in underserved communities.",
      icon:  "heroHeart"
    }
  ];

}
