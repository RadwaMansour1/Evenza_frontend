import { Component } from '@angular/core';
import { AdminHeaderComponent } from "../header-admin/header.component";
import { SidebarComponent } from "../sidebar-admin/sidebar.component";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavBarComponent } from "../../nav-bar/nav-bar.component";

@Component({
  selector: 'app-admin-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  imports: [AdminHeaderComponent, SidebarComponent, CommonModule, RouterModule, NavBarComponent],
})
export class AdminLayoutComponent {
  sidebarState = true;
  sidebarHovered = false;

  updateSidebarState(state: boolean) {
    this.sidebarState = state;
    // Force layout recalculation
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 300);
  }
    get sidebarClass() {
    return this.sidebarState || this.sidebarHovered ? 'sidebar-expanded' : 'sidebar-collapsed';
  }
}