import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  constructor(private translate: TranslateService) {}

  getCurrentLanguage(): 'en' | 'ar' {
    return (localStorage.getItem('app_lang') as 'en' | 'ar') || 'en';
  }
  switchLanguage(lang: 'en' | 'ar') {
    this.translate.use(lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    localStorage.setItem('app_lang', lang);
  }
}
