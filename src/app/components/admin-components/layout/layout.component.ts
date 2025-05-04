import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

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
  heroArrowPath,
} from '@ng-icons/heroicons/outline';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { SidebarComponent } from "../sidebar-admin/sidebar.component";
@Component({
  selector: 'app-admin-layout',
  imports: [RouterOutlet, CommonModule, NgIcon, SidebarComponent],

  templateUrl: './layout.component.html',
  providers: [
    provideIcons({
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
      heroArrowPath,
    }),
  ],
})
export class AdminLayoutComponent {
  constructor() {}
}
