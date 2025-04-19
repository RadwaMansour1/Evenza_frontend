import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'evenza-frontend';
  constructor(private translate: TranslateService) {}
  changeLanguage() {
    let currentLang = this.translate.currentLang;
    this.translate.use(currentLang === 'en' ? 'ar' : 'en');
  }
}
