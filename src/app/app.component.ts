import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { TranslateModule } from '@ngx-translate/core';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { EventDetailsComponent } from './components/event-details/event-details.component';
import { AllEventsComponent } from './components/all-events/all-events.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RefundComponent } from './components/refund/refund.component';
import { OrderComponent } from './components/order/order.component';
import { AboutComponent } from './components/about/about.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LanguageService } from './services/language/language.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    TranslateModule,
    NavBarComponent,
    FooterComponent,
    RouterModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'evenza-frontend';
  constructor(private languageService: LanguageService) {}
  ngOnInit() {
    const savedLang = (localStorage.getItem('app_lang') as 'en' | 'ar') || 'en';
    this.languageService.switchLanguage(savedLang);
  }
}
