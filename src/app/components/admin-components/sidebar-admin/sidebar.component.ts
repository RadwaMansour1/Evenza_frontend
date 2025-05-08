import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgIconComponent } from '@ng-icons/core';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, NgIconComponent, RouterModule],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  @Input() isSidebarOpen = true;
  @Output() sidebarStateChange = new EventEmitter<boolean>();
  
  isHovered = false;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
    this.sidebarStateChange.emit(this.isSidebarOpen);
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    if (!this.isSidebarOpen) {
      this.isHovered = true;
      this.sidebarStateChange.emit(true); // Consider sidebar "open" when hovered
    }
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.isHovered = false;
    if (!this.isSidebarOpen) {
      this.sidebarStateChange.emit(false); // Update when hover ends
    }
  }
}