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
} from '@ng-icons/feather-icons';
import { heroTicket, heroMap } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-category-list-section',
  imports: [CommonModule, NgIcon],
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
      name: 'Concerts',
      count: 127,
      bgColor: 'bg-red-100',
      textColor: 'text-red-500',
    },
    {
      icon: 'featherBriefcase',
      name: 'Conferences',
      count: 89,
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-500',
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
      icon: 'heroTicket',
      name: 'Festivals',
      count: 42,
      bgColor: 'bg-yellow-100',
      textColor: 'text-yellow-500',
    },
    {
      icon: 'featherCoffee',
      name: 'Food & Drink',
      count: 36,
      bgColor: 'bg-orange-100',
      textColor: 'text-orange-500',
    },
    {
      icon: 'matColorLensOutline',
      name: 'Arts',
      count: 58,
      bgColor: 'bg-pink-100',
      textColor: 'text-pink-500',
    },
    {
      icon: 'heroMap',
      name: 'Tours',
      count: 29,
      bgColor: 'bg-emerald-100',
      textColor: 'text-emerald-500',
    },
  ];
}
