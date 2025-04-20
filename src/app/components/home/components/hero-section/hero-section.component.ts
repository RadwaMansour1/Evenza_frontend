import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { featherMapPin, featherCalendar } from '@ng-icons/feather-icons';
@Component({
  selector: 'app-hero-section',
  imports: [NgIcon],
  templateUrl: './hero-section.component.html',
  providers: [provideIcons({ featherMapPin, featherCalendar })],
})
export class HeroSectionComponent {

}
