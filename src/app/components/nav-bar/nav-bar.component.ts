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
  heroGlobeAlt,
  heroGlobeEuropeAfrica,
} from '@ng-icons/heroicons/outline';
import { LanguageService } from '../../services/language/language.service';

@Component({
  selector: 'app-nav-bar',
  imports: [CommonModule, NgIcon, RouterModule],
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
      heroGlobeAlt,
      heroGlobeEuropeAfrica,
    }),
    provideNgIconsConfig({
      size: '1.26em',
    }),
  ],
})
export class NavBarComponent {
  isMenuOpen = false;
  isMenuUserOpen = false;

  navLinks = [
    { label: 'Home', href: '/' },
    { label: 'All Events', href: '/events' },
    { label: 'Concerts', href: '/events?category=concerts' },
    { label: 'Conferences', href: '/events?category=conferences' },
    { label: 'About', href: '/about' },
    { label: 'FAQs', href: '/faqs' },
  ];
  currentLang: 'en' | 'ar' = 'en';
  constructor(private languageService: LanguageService) {
    this.currentLang = this.languageService.getCurrentLanguage();
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleLanguage() {
    this.currentLang = this.currentLang === 'en' ? 'ar' : 'en';
    this.languageService.switchLanguage(this.currentLang);
  }

  // Method to toggle the state
  toggleUserMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    console.log('Menu toggled. isMenuOpen:', this.isMenuOpen);
  }

  // Optional: Method to close the menu (e.g., called on link click)
  closeUserMenu() {
    this.isMenuOpen = false;
    console.log('Menu closed.');
  }
}
