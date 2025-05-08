import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth/auth.service';
import { SnackbarService } from '../../../services/notification/snackbar.service';
import { EventService } from '../../../services/event/event.service';
import { CommonModule } from '@angular/common';
import { NgIconComponent } from '@ng-icons/core';

interface Notification {
  id: string;
  type: 'refund' | 'event' | 'user';
  message: string;
  time: Date;
  read: boolean;
  link?: string;
  data?: any;
}

@Component({
  selector: 'app-admin-header',
  imports: [CommonModule,NgIconComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class AdminHeaderComponent implements OnInit {
  // User data
  user: any = null;
  userInitials: string = 'AD';
  
  // Notifications
  notifications: Notification[] = [];
  unreadNotifications: number = 0;
  isNotificationsOpen: boolean = false;
  
  // User menu
  isUserMenuOpen: boolean = false;
  
  // Stats
  todayEvents: number = 0;
  pendingApprovals: number = 0;
  
  constructor(
    private authService: AuthService,
    private notificationService: SnackbarService,
    private eventService: EventService,
    private router: Router,
    private toastr: ToastrService
  ) {}
  
  ngOnInit(): void {
    // this.loadUserData();
    // this.loadNotifications();
    // this.loadStats();
    
    // Set up click outside to close dropdowns
    document.addEventListener('click', this.handleClickOutside.bind(this));
  }
  
  ngOnDestroy(): void {
    document.removeEventListener('click', this.handleClickOutside.bind(this));
  }
  
  /**
   * Load user data from auth service
   */
  // loadUserData(): void {
  //   this.authService.getCurrentUser().subscribe({
  //     next: (user) => {
  //       this.user = user;
  //       if (user?.displayName) {
  //         this.userInitials = this.getInitials(user.displayName);
  //       }
  //     },
  //     error: (err) => {
  //       console.error('Error loading user data:', err);
  //     }
  //   });
  // }
  
  /**
   * Get user initials from full name
   */
  getInitials(name: string): string {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase()
      .substring(0, 2);
  }
  
  /**
   * Load notifications from service
   */
  // loadNotifications(): void {
  //   this.notificationService.getNotifications().subscribe({
  //     next: (notifications) => {
  //       this.notifications = notifications;
  //       this.unreadNotifications = notifications.filter(n => !n.read).length;
  //     },
  //     error: (err) => {
  //       console.error('Error loading notifications:', err);
  //     }
  //   });
  // }
  
  /**
   * Load statistics for header display
   */
  // loadStats(): void {
  //   // Get today's events count
  //   this.eventService.getTodayEventsCount().subscribe({
  //     next: (count) => {
  //       this.todayEvents = count;
  //     }
  //   });
    
  //   // Get pending approvals count
  //   this.eventService.getPendingApprovalsCount().subscribe({
  //     next: (count) => {
  //       this.pendingApprovals = count;
  //     }
  //   });
  // }
  
  /**
   * Toggle notifications dropdown
   */
  toggleNotifications(event?: MouseEvent): void {
    if (event) {
      event.stopPropagation();
    }
    this.isNotificationsOpen = !this.isNotificationsOpen;
    
    // Close user menu if open
    if (this.isNotificationsOpen) {
      this.isUserMenuOpen = false;
    }
  }
  
  /**
   * Toggle user menu dropdown
   */
  toggleUserMenu(event?: MouseEvent): void {
    if (event) {
      event.stopPropagation();
    }
    this.isUserMenuOpen = !this.isUserMenuOpen;
    
    // Close notifications if open
    if (this.isUserMenuOpen) {
      this.isNotificationsOpen = false;
    }
  }
  
  /**
   * Handle click outside to close dropdowns
   */
  handleClickOutside(event: MouseEvent): void {
    const notificationsEl = document.querySelector('.notifications-dropdown');
    const userMenuEl = document.querySelector('.user-dropdown');
    
    if (this.isNotificationsOpen && 
        notificationsEl && 
        !notificationsEl.contains(event.target as Node)) {
      this.isNotificationsOpen = false;
    }
    
    if (this.isUserMenuOpen && 
        userMenuEl && 
        !userMenuEl.contains(event.target as Node)) {
      this.isUserMenuOpen = false;
    }
  }
  
  /**
   * Mark all notifications as read
   */
  // markAllAsRead(): void {
  //   this.notificationService.markAllAsRead().subscribe({
  //     next: () => {
  //       this.notifications.forEach(n => n.read = true);
  //       this.unreadNotifications = 0;
  //       this.toastr.success('All notifications marked as read');
  //     },
  //     error: (err) => {
  //       console.error('Error marking notifications as read:', err);
  //       this.toastr.error('Failed to mark notifications as read');
  //     }
  //   });
  // }
  
  /**
   * Handle clicking on a notification
   */
  // handleNotification(notification: Notification): void {
  //   // Mark as read if not already
  //   if (!notification.read) {
  //     this.notificationService.markAsRead(notification.id).subscribe();
  //   }
    
  //   // Navigate to relevant page based on notification type
  //   if (notification.link) {
  //     this.router.navigateByUrl(notification.link);
  //   } else {
  //     switch (notification.type) {
  //       case 'refund':
  //         this.router.navigateByUrl('/admin/refunds');
  //         break;
  //       case 'event':
  //         this.router.navigateByUrl('/admin/events');
  //         break;
  //       case 'user':
  //         this.router.navigateByUrl('/admin/users');
  //         break;
  //     }
  //   }
    
  //   // Close notifications dropdown
  //   this.isNotificationsOpen = false;
  // }
  
  /**
   * Navigate to all notifications page
   */
  viewAllNotifications(): void {
    this.router.navigateByUrl('/admin/notifications');
    this.isNotificationsOpen = false;
  }
  
  /**
   * Log out user
   */
  // logout(): void {
  //   this.authService.logout().subscribe({
  //     next: () => {
  //       this.router.navigateByUrl('/login');
  //       this.toastr.success('Logged out successfully');
  //     },
  //     error: (err) => {
  //       console.error('Error logging out:', err);
  //       this.toastr.error('Failed to log out');
  //     }
  //   });
  // }
}