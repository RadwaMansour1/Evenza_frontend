import { Component, NgModule, OnInit } from '@angular/core';
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
import { DashboardComponent } from "./components/admin-components/dashboard/dashboard.component";
import { SidebarComponent } from "./components/admin-components/sidebar-admin/sidebar.component";
import { HeaderComponent } from "./components/admin-components/header-admin/header.component";
import { NgIconComponent, NgIconsModule } from '@ng-icons/core';

import { 
  heroChartBar, 
  heroUsers, 
  heroTicket, 
  heroCalendar, 
  heroCog, 
  heroBell,
  heroMagnifyingGlass,
  heroChevronDown,
  heroPencilSquare,
  heroTrash,
  heroCheckCircle,
  heroXCircle,
  heroArrowPath
} from '@ng-icons/heroicons/outline';
import { AdminEventsComponent } from "./components/admin-components/events-page/events.component";
import { UsersComponent } from "./components/admin-components/users/users.component";
import { CategoriesComponent } from "./components/admin-components/categories/categories.component";
import { BookingsComponent } from "./components/admin-components/orders/bookings.component";
import { ReviewComponent } from "./components/admin-components/reviews/review.component";
import { AnalyticsComponent } from "./components/admin-components/analytics/analytics.component";
import { EventEditPageComponent } from "./components/admin-components/event-edit/event-edit-page.component";


@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    TranslateModule,
    NavBarComponent,
    FooterComponent,
    RouterModule,
    DashboardComponent,
    // SidebarComponent,
    HeaderComponent,
    NgIconComponent,
    AdminEventsComponent,
    UsersComponent,
    CategoriesComponent,
    BookingsComponent,
    ReviewComponent,
    AnalyticsComponent,
    SidebarComponent,
    EventEditPageComponent
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
