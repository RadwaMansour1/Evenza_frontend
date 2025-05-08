import { Component } from '@angular/core';
import { AdminHeaderComponent } from "../header-admin/header.component";
import { SidebarComponent } from "../sidebar-admin/sidebar.component";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './layout.component.html',
  imports: [AdminHeaderComponent, SidebarComponent,CommonModule,RouterModule],
})
export class AdminLayoutComponent {
  sidebarState = true;
  sidebarHovered = false;

  updateSidebarState(state: boolean) {
    // If this is coming from a hover event in the sidebar
    if (this.sidebarState === false && state === true) {
      this.sidebarHovered = true;
    } else if (this.sidebarState === false && state === false) {
      this.sidebarHovered = false;
    } else {
      // This is a regular toggle, not hover
      this.sidebarState = state;
    }
  }
}