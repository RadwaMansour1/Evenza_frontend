import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { featherMapPin, featherCalendar } from '@ng-icons/feather-icons';
import { FeaturedEventsSectionComponent } from "./components/featured-events-section/featured-events-section.component";
import { HeroSectionComponent } from "./components/hero-section/hero-section.component";
@Component({
  selector: 'app-home',
  imports: [NgIcon, FeaturedEventsSectionComponent, HeroSectionComponent],
  templateUrl: './home.component.html',
  providers: [provideIcons({ featherMapPin, featherCalendar })],
})
export class HomeComponent {}
