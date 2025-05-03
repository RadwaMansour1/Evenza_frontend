import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgIcon, provideIcons, provideNgIconsConfig } from '@ng-icons/core';
import {
  featherCalendar,
  featherCreditCard,
  featherLayers,
} from '@ng-icons/feather-icons';
import { heroTicket, heroMagnifyingGlass } from '@ng-icons/heroicons/outline';
import { TranslateModule } from '@ngx-translate/core';
@Component({
  selector: 'app-how-it-work-section',
  imports: [CommonModule, NgIcon, TranslateModule],
  templateUrl: './how-it-work-section.component.html',
  providers: [
    provideIcons({
      heroMagnifyingGlass,
      featherCalendar,
      featherCreditCard,
      heroTicket,
      featherLayers,
    }),
    provideNgIconsConfig({
      size: '1.5rem',
    }),
  ],
})
export class HowItWorkSectionComponent {
  steps = [
    {
      icon: 'heroMagnifyingGlass',
      title: 'home.howItWorks.step1.title',
      description: 'home.howItWorks.step1.description',
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-500',
    },
    {
      icon: 'featherLayers',
      title: 'home.howItWorks.step2.title',
      description: 'home.howItWorks.step2.description',
      bgColor: 'bg-purple-100',
      textColor: 'text-purple-500',
    },
    {
      icon: 'featherCreditCard',
      title: 'home.howItWorks.step3.title',
      description: 'home.howItWorks.step3.description',
      bgColor: 'bg-green-100',
      textColor: 'text-green-500',
    },
    {
      icon: 'heroTicket',
      title: 'home.howItWorks.step4.title',
      description: 'home.howItWorks.step4.description',
      bgColor: 'bg-orange-100',
      textColor: 'text-orange-500',
    },
  ];
}
