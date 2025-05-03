import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter, RouterModule } from '@angular/router';
import { routes } from './app.routes';
import {
  HttpClient,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { provideAnimations } from '@angular/platform-browser/animations';

import { provideToastr } from 'ngx-toastr';
import { 
  heroChartBar,
  heroSquare2Stack, 
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
  heroArrowPath,
  heroTag,
  heroPresentationChartLine,
  heroDocument,
  heroChevronLeft,
  heroChevronRight,
  heroPlus,
  heroStar,
  heroNoSymbol,
  heroPause,
  heroStop,
  heroPlay,
  heroExclamationCircle,
  heroExclamationTriangle,
  heroEye,
  heroXMark

  
} from '@ng-icons/heroicons/outline';
import { NgIconsModule } from '@ng-icons/core';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: createTranslateLoader,
          deps: [HttpClient],
        },
        defaultLanguage: 'en',
      })
    ),
    importProvidersFrom(
      NgIconsModule.withIcons({
        heroChartBar: heroChartBar,
        heroUsers: heroUsers,
        heroTicket: heroTicket,
        heroSquare2Stack,
        heroDocument,
        heroCalendar,
        heroCog,
        heroBell,
        heroPlus,
        heroMagnifyingGlass,
        heroChevronDown,
        heroChevronLeft,
        heroChevronRight,
        heroPencilSquare,
        heroTrash,
        heroCheckCircle,
        heroXCircle,
        heroArrowPath,
        heroTag,
        heroPresentationChartLine,
        heroStar,
        heroNoSymbol,
        heroPause,
        heroStop,
        heroPlay,
        heroExclamationCircle,
        heroExclamationTriangle,
        heroEye,
        heroXMark,
        
        
        
      })
    ),

    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    // provideStore(appStore),
    // provideEffects([EventEffects]),
    provideAnimations(), // required animations providers
    provideToastr({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      
    }), // Toastr providers
  ],
};
