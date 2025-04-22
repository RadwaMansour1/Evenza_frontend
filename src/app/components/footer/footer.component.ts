import { Component } from '@angular/core';
import { NgIcon,provideIcons } from '@ng-icons/core';
import {
  featherFacebook,
  featherTwitter,
  featherInstagram,
  featherLinkedin,
  featherCalendar,
} from '@ng-icons/feather-icons';

@Component({
  selector: 'app-footer',
  imports: [NgIcon],
  templateUrl: './footer.component.html',
  providers: [
    provideIcons({
      featherFacebook,
      featherTwitter,
      featherInstagram,
      featherLinkedin,
      featherCalendar,
    }),
  ],
})
export class FooterComponent {}
