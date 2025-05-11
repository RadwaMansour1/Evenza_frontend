// simple-layout.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AdminHeaderComponent } from "../header-admin/header.component";

@Component({
  selector: 'app-simple-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, AdminHeaderComponent],
  template: `
    <!-- <app-admin-header></app-admin-header> -->
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class SimpleLayoutComponent {}