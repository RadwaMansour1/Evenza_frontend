import { Component, OnInit } from '@angular/core';
import {  RouterModule, RouterOutlet } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { LanguageService } from './services/language/language.service';
import { SnackbarComponent } from './components/snackbar/snackbar.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    TranslateModule,
    NavBarComponent,
    FooterComponent,
    RouterModule,
    SnackbarComponent
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
