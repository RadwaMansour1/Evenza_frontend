import { TranslateService } from '@ngx-translate/core';
import {
  AfterViewInit,
  Component,
  HostBinding,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FooterComponent } from './components/footer/footer.component';
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

import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { CommonModule } from '@angular/common';
import { ChatbotComponent } from './components/chatbot/chatbot.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
    EventEditPageComponent,
    SnackbarComponent,
    CommonModule,
    ChatbotComponent,
    CommonModule,
],
  
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit, AfterViewInit {
  isOrganizer = false;
  @ViewChild(ChatbotComponent) chatbotComponent!: ChatbotComponent;
  @HostBinding('class.chatbot-open') isChatbotOpenClass = false;

  constructor(
    private languageService: LanguageService,
    private router: Router
  ) {}
  ngOnInit() {
    const savedLang = (localStorage.getItem('app_lang') as 'en' | 'ar') || 'en';
    this.languageService.switchLanguage(savedLang);
    this.checkIfOrganizer(this.router.url);

    this.router.events.subscribe(() => {
      this.checkIfOrganizer(this.router.url);
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      if (this.chatbotComponent && this.chatbotComponent.isChatOpen) {
        this.focusChatbotInput();
      }
    }, 100);
  }

  onChatbotOpenChange(isOpen: boolean) {
    this.isChatbotOpenClass = isOpen;
    if (isOpen) {
      setTimeout(() => {
        this.focusChatbotInput();
      }, 100);
    }
  }

  private checkIfOrganizer(url: string) {
    this.isOrganizer = url.includes('organizer');
    if (this.isOrganizer) {
      this.languageService.switchLanguage('en');
      localStorage.setItem('app_lang', 'en');
    }
  }

  private focusChatbotInput() {
    const inputElement = document.getElementById('chatbotInput');
    if (inputElement) {
      inputElement.focus();
    }
  }
}
