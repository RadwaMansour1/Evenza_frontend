import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgIconComponent } from '@ng-icons/core';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule,NgIconComponent,RouterModule],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  isSidebarOpen = true;
  isHovered = false;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    if (!this.isSidebarOpen) {
      this.isHovered = true;
    }
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.isHovered = false;
  }
}