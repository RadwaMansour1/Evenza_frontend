import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgIcon, provideIcons, provideNgIconsConfig } from '@ng-icons/core';
import {
  matTheaterComedyOutline,
  matColorLensOutline,
} from '@ng-icons/material-icons/outline';
import {
  featherMusic,
  featherBriefcase,
  featherAward,
  featherCoffee,
  featherShoppingBag,
  featherMonitor,
} from '@ng-icons/feather-icons';
import { heroTicket, heroMap } from '@ng-icons/heroicons/outline';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-category-list-section',
  imports: [CommonModule, NgIcon,TranslateModule],
  templateUrl: './category-list-section.component.html',
  providers: [
    provideIcons({
      matTheaterComedyOutline,
      featherMusic,
      featherBriefcase,
      featherAward,
      heroTicket,
      featherCoffee,
      matColorLensOutline,
      heroMap,
      featherShoppingBag,
      featherMonitor,
    }),
    provideNgIconsConfig({
      size: '1.5em',
    }),
  ],
})
export class CategoryListSectionComponent {
  categories = [
    {
      icon: 'featherMusic',
      name: 'Music',
      count: 127,
      bgColor: 'bg-red-100',
      textColor: 'text-red-500',
    },
    {
      icon: 'featherBriefcase',
      name: 'Conference',
      count: 89,
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-500',
    },
    {
      icon: 'featherCoffee',
      name: 'Workshop',
      count: 0,
      bgColor: 'bg-orange-100',
      textColor: 'text-orange-500',
    },
    {
      icon: 'featherMonitor',
      name: 'Tech',
      count: 0,
      bgColor: 'bg-teal-100',
      textColor: 'text-teal-500',
    },

    {
      icon: 'matTheaterComedyOutline',
      name: 'Theater',
      count: 64,
      bgColor: 'bg-purple-100',
      textColor: 'text-purple-500',
    },
    {
      icon: 'featherAward',
      name: 'Sports',
      count: 105,
      bgColor: 'bg-green-100',
      textColor: 'text-green-500',
    },
    {
      icon: 'featherShoppingBag',
      name: 'Business',
      count: 0,
      bgColor: 'bg-indigo-100',
      textColor: 'text-indigo-500',
    },
    {
      icon: 'matColorLensOutline',
      name: 'Art',
      count: 58,
      bgColor: 'bg-pink-100',
      textColor: 'text-pink-500',
    },
  ];

  constructor(private router: Router) {}

  onClickCategory(category: string) {
    this.router.navigate(['/events'], { queryParams: { search: category } });
  }
}
