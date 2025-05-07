import { NgIcon, provideIcons } from '@ng-icons/core';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { featherCheck, featherChevronDown, featherChevronLeft, featherChevronRight, featherChevronUp, featherClock, featherFilter, featherSearch } from '@ng-icons/feather-icons';

@Component({
  selector: 'app-activity-log',
  standalone: true,
  imports: [CommonModule, FormsModule, NgIcon],
  templateUrl: './activity-log.component.html',
  styleUrls: ['./activity-log.component.css'],
  providers: [
    provideIcons({
      featherClock,
      featherSearch,
      featherFilter,
      featherChevronDown,
      featherChevronUp,
      featherCheck,
      featherChevronRight,
      featherChevronLeft
      
    })
  ]
})
export class ActivityLogComponent implements OnInit {
  user: any = { name: 'Test User' }; // Replace with auth service
  loading = false;
  searchQuery = '';
  currentTab: 'all' | 'success' | 'failed' | 'warning' = 'all';
  filterType: 'all' | 'login' | 'password' | 'security' | 'session' = 'all';

  showMenu: boolean = false;
  options = [
  { value: 'all', label: 'All Types' },
  { value: 'login', label: 'Login' },
  { value: 'password', label: 'Password' },
  { value: 'security', label: 'Security' },
  { value: 'session', label: 'Session' }
];

selectOption(option: any) {
  this.filterType = option.value;
  this.showMenu = false;
}



  activities = [
    { id: '1', type: 'login', description: 'Logged in successfully', device: 'Chrome on Windows', location: 'New York, USA', ip: '192.168.1.1', timestamp: '2025-05-03T14:30:00', status: 'success' },
    { id: '2', type: 'login', description: 'Failed login attempt', device: 'Firefox on MacOS', location: 'Los Angeles, USA', ip: '192.168.1.2', timestamp: '2025-05-03T10:15:00', status: 'failed' },
    { id: '3', type: 'password', description: 'Password changed', device: 'Chrome on Windows', location: 'New York, USA', ip: '192.168.1.1', timestamp: '2025-05-02T09:45:00', status: 'success' },
    { id: '4', type: 'security', description: 'Two-factor authentication enabled', device: 'Mobile App on iPhone', location: 'Chicago, USA', ip: '192.168.1.3', timestamp: '2025-05-01T16:20:00', status: 'success' },
    { id: '5', type: 'login', description: 'Logged in successfully', device: 'Safari on iPad', location: 'Miami, USA', ip: '192.168.1.4', timestamp: '2025-04-30T11:05:00', status: 'success' },
    { id: '6', type: 'security', description: 'Security settings updated', device: 'Chrome on Windows', location: 'New York, USA', ip: '192.168.1.1', timestamp: '2025-04-29T15:40:00', status: 'success' },
    { id: '7', type: 'login', description: 'Suspicious login attempt', device: 'Unknown Device', location: 'Moscow, Russia', ip: '192.168.1.5', timestamp: '2025-04-28T03:25:00', status: 'warning' },
    { id: '8', type: 'session', description: 'Session revoked', device: 'Firefox on Linux', location: 'Seattle, USA', ip: '192.168.1.6', timestamp: '2025-04-27T18:10:00', status: 'success' },
    { id: '9', type: 'login', description: 'Logged in successfully', device: 'Chrome on Windows', location: 'New York, USA', ip: '192.168.1.1', timestamp: '2025-04-26T09:35:00', status: 'success' },
    { id: '10', type: 'session', description: 'All sessions logged out', device: 'Chrome on Windows', location: 'New York, USA', ip: '192.168.1.1', timestamp: '2025-04-25T14:50:00', status: 'success' }
  ];

  constructor(public router: Router) {}

  ngOnInit(): void {
    if (!this.user && !this.loading) {
      this.router.navigate(['/login']);
    }
  }

  filtered() {
    return this.activities.filter(a => {
      const tabMatch = this.currentTab === 'all' || a.status === this.currentTab;
      const typeMatch = this.filterType === 'all' || a.type === this.filterType;
      const searchMatch = !this.searchQuery || a.description.toLowerCase().includes(this.searchQuery.toLowerCase());
      return tabMatch && typeMatch && searchMatch;
    });
  }

  getBadgeClass(status: string) {
    return {
      success: 'bg-green-500 text-white',
      failed: 'bg-red-500 text-white',
      warning: 'bg-yellow-400 text-white'
    }[status] || 'bg-gray-300 text-black';
  }
}
