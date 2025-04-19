import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { TranslateModule } from '@ngx-translate/core';
import { NavBarComponent } from "./components/nav-bar/nav-bar.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TranslateModule, NavBarComponent],
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
