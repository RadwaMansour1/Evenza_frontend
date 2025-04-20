import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { featherMapPin, featherCalendar } from '@ng-icons/feather-icons';
import { FeaturedEventsSectionComponent } from './components/featured-events-section/featured-events-section.component';
import { HeroSectionComponent } from './components/hero-section/hero-section.component';
import { CategoryListSectionComponent } from './components/category-list-section/category-list-section.component';
import { HowItWorkSectionComponent } from './components/how-it-work-section/how-it-work-section.component';
import { ReviewsSectionComponent } from './components/reviews-section/reviews-section.component';
@Component({
  selector: 'app-home',
  imports: [
    NgIcon,
    ReviewsSectionComponent,
    FeaturedEventsSectionComponent,
    HeroSectionComponent,
    CategoryListSectionComponent,
    HowItWorkSectionComponent,
  ],
  templateUrl: './home.component.html',
  providers: [provideIcons({ featherMapPin, featherCalendar })],
})
export class HomeComponent {}
