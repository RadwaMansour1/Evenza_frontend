import { AfterViewInit, Component, HostBinding, OnInit, ViewChild } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { LanguageService } from './services/language/language.service';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { CommonModule } from '@angular/common';
import { ChatbotComponent } from './components/chatbot/chatbot.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    TranslateModule,
    NavBarComponent,
    FooterComponent,
    RouterModule,
    SnackbarComponent,
    CommonModule,
    ChatbotComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit , AfterViewInit{
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
  }

  private focusChatbotInput() {
    const inputElement = document.getElementById('chatbotInput');
    if (inputElement) {
      inputElement.focus();
    }
  }
}
