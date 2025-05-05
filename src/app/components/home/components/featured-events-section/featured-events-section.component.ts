import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { EventCardComponent } from './components/event-card/event-card.component';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroChevronLeft, heroChevronRight } from '@ng-icons/heroicons/outline';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../../../../services/language/language.service';

@Component({
  selector: 'app-featured-events-section',
  imports: [CommonModule, EventCardComponent, NgIcon, TranslateModule],
  templateUrl: './featured-events-section.component.html',
  providers: [provideIcons({ heroChevronRight,heroChevronLeft })],
})
export class FeaturedEventsSectionComponent {
  currentLang: 'en' | 'ar' = 'en';
  constructor(
    private router: Router,
    private languageService: LanguageService
  ) {
    const lang = this.languageService.getCurrentLanguage();
    this.currentLang = lang;
  }
  featuredEvents = [
    {
      image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=2670&auto=format&fit=crop',
      category: 'Concert',
      title: 'Nile Jazz Nights 2025',
      date: 'June 20, 2025',
      time: '9:00 PM',
      location: 'Zamalek, Cairo',
      price: 199,
    },
    {
      image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2612&auto=format&fit=crop',
      category: 'Conference',
      title: 'Tech Innovations Summit',
      date: 'July 10–12, 2025',
      time: '10:00 AM',
      location: 'Smart Village, Giza',
      price: 299,
    },
    {
      image:
        'https://images.unsplash.com/photo-1503095396549-807759245b35?q=80&w=2671&auto=format&fit=crop',
      category: 'Theater',
      title: 'Cairo Theater Festival',
      date: 'August 5–10, 2025',
      time: '7:30 PM',
      location: 'The Egyptian Theater, Cairo',
      price: 249,
    },
    {
      image: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?q=80&w=2669&auto=format&fit=crop',
      category: 'Sports',
      title: 'Cairo International Marathon',
      date: 'June 15–18, 2025',
      time: '5:00 PM',
      location: 'Cairo International Stadium, Cairo',
      price: 300,
    },
  ];
  viewAllEvents() {
    this.router.navigate(['/events']);
  }
}
