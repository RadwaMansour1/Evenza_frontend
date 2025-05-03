import { Component } from '@angular/core';
import { NgIcon,provideIcons } from '@ng-icons/core';
import {
  featherFacebook,
  featherTwitter,
  featherInstagram,
  featherLinkedin,
  featherCalendar,
} from '@ng-icons/feather-icons';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  imports: [NgIcon,TranslateModule],
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
export class FooterComponent {
  email='evenza123@gmail.com';
}
