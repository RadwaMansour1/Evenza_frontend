import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterLinkActive, RouterModule, Router } from '@angular/router';
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
import { featherLogOut } from '@ng-icons/feather-icons';
import { LanguageService } from '../../services/language/language.service';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../services/auth/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-nav-bar',
  imports: [
    CommonModule,
    NgIcon,
    RouterModule,
    TranslateModule,
    RouterLinkActive,
    FormsModule,
  ],
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
      featherLogOut,
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
    { label: 'home.navbar.home', href: '/' },
    { label: 'home.navbar.events', href: '/events' },
    // { label: 'Concerts', href: '/events?category=concerts' },
    // { label: 'Conferences', href: '/events?category=conferences' },
    { label: 'home.navbar.about', href: '/about' },
    { label: 'home.navbar.FAQs', href: '/faqs' },
  ];

  navItems = [
    {
      route: '/my-wallet',
      name: 'home.navbar.myWallet',
      icon: 'heroWallet',
    },
    {
      route: '/my-tickets',
      name: 'home.navbar.myTickets',
      icon: 'heroTicket',
    },
  ];
  currentLang: 'en' | 'ar' = 'en';
  isAuthenticated = false;

  searchQuery: string = '';


  constructor(
    private languageService: LanguageService,
    private router: Router,
    private authService: AuthService
  ) {
    this.currentLang = this.languageService.getCurrentLanguage();
    this.isAuthenticated = this.authService.isloggedIn();
    console.log(this.authService.isloggedIn());
  }
  // method for logOut button
  signOut() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleLanguage() {
    this.currentLang = this.currentLang === 'en' ? 'ar' : 'en';
    this.languageService.switchLanguage(this.currentLang);
  }
  toggleUserMenu() {
    this.isMenuUserOpen = !this.isMenuUserOpen;
    console.log('Menu toggled. isMenuOpen:', this.isMenuUserOpen);
  }
  closeUserMenu() {
    this.isMenuUserOpen = false;
    console.log('Menu closed.');
  }
  @HostListener('document:click', ['$event'])
  clickOutside(event: MouseEvent) {
    const menuButton = document.getElementById('user-menu-button');
    const menu = document.querySelector('[role="menu"]');

    // Check if the click was outside the menu and menu button
    if (
      menu &&
      menuButton &&
      !this.isMenuOpen &&
      !menu.contains(event.target as Node) &&
      !menuButton.contains(event.target as Node)
    ) {
      this.closeUserMenu();
    }
  }

  logout() {
    this.closeUserMenu();
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  onSearch() {
    if (this.searchQuery) {
      this.router.navigate(['/events'], {
        queryParams: { search: this.searchQuery },
      });
      this.searchQuery = '';
    }
  }
}
