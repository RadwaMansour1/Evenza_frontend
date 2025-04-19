import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgIcon, provideIcons, provideNgIconsConfig } from '@ng-icons/core';
import {
  heroTicket,
  heroHeart,
  heroUser,
  heroCalendarDays,
  heroBars3,
  heroXMark,
  heroMagnifyingGlass,
} from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-nav-bar',
  imports: [CommonModule, NgIcon],
  standalone: true,
  templateUrl: './nav-bar.component.html',
  providers: [
    provideIcons({
      heroTicket,
      heroHeart,
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
    { label: 'All Events', href: '#' },
    { label: 'Concerts', href: '#' },
    { label: 'Conferences', href: '#' },
    { label: 'Theater', href: '#' },
    { label: 'Sports', href: '#' },
  ];

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
