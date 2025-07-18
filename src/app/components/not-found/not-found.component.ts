import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroHome, heroMagnifyingGlass } from '@ng-icons/heroicons/outline';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-not-found',
  imports: [NgIcon, TranslateModule],
  templateUrl: './not-found.component.html',
  viewProviders:[provideIcons({heroHome, heroMagnifyingGlass})]

})
export class NotFoundComponent {
  constructor(private router: Router) {}

  navigateHome() {
    this.router.navigate(['/']);
  }

  navigateEvents() {
    this.router.navigate(['/events']);
  }

  navigateContact() {
    this.router.navigate(['/contact']);
  }
}
