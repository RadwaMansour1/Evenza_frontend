import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { featherMapPin, featherCalendar } from '@ng-icons/feather-icons';
import { TranslateModule } from '@ngx-translate/core';
@Component({
  selector: 'app-hero-section',
  imports: [NgIcon, TranslateModule],
  templateUrl: './hero-section.component.html',
  providers: [provideIcons({ featherMapPin, featherCalendar })],
})
export class HeroSectionComponent {
  constructor(private router: Router) {}
  findEvents(query: string): void {
    if (query.trim()) {
      this.router.navigate(['/events'], {
        queryParams: { search: query.trim() },
      });
    }
  }
  navigateToEvents() {
    this.router.navigate(['/events']);
  }
}
