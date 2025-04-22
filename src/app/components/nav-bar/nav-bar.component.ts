import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgIcon, provideIcons, provideNgIconsConfig } from '@ng-icons/core';
import {
  heroTicket,
  heroWallet,
  heroUser,
  heroCalendarDays,
  heroBars3,
  heroXMark,
  heroMagnifyingGlass,
} from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-nav-bar',
  imports: [CommonModule, NgIcon,RouterModule],
  standalone: true,
  templateUrl: './nav-bar.component.html',
  providers: [
    provideIcons({
      heroTicket,
      heroWallet,
      heroUser,
      heroCalendarDays,
      heroBars3,
      heroXMark,
      heroMagnifyingGlass,
    }),
    provideNgIconsConfig({
      size: '1.26em',
    }),
  ],
})
export class NavBarComponent {
  isMenuOpen = false;

  navLinks = [
    { label: 'Home', href: '/' },
    { label: 'All Events', href: '/events' },
    { label: 'Concerts', href: '/events?category=concerts' },
    { label: 'Conferences', href: '/events?category=conferences' },
    { label: 'About', href: '/about' },
    { label: 'FAQs', href: '/faqs' },
  ];

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
