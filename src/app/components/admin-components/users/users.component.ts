// src/app/modules/users/users.component.ts
import { Component, OnInit } from '@angular/core';
import { UsersService, User } from '../../../services/admin/users.service';
import { NgIconComponent } from '@ng-icons/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, NgIconComponent, FormsModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  searchTerm: string = '';
  isLoading = true;
  error: string | null = null;

  roles = ['all', 'admin', 'organizer', 'user'];
  selectedRole = 'all';

  statuses = ['all', 'active', 'suspended', 'banned', 'inactive'];
  selectedStatus = 'all';
  userRole = ['admin', 'organizer', 'user'];

  // Modal states
  isSuspendModalOpen = false;
  isBanModalOpen = false;
  isReactivateModalOpen = false;
  selectedUserId: string | null = null;
  selectedUserName: string = '';

  constructor(
    private usersService: UsersService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.isLoading = true;
    this.usersService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.filteredUsers = [...users];
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load users';
        this.isLoading = false;
        console.error(err);
        this.toastr.error('Could not load users', 'Error');
      }
    });
  }

  filterUsers(): void {
    this.filteredUsers = this.users.filter(user => {
      const matchesSearch = 
        user.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        `${user.firstName} ${user.lastName}`.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesRole = this.selectedRole === 'all' || user.role === this.selectedRole;
      
      const matchesStatus = 
        this.selectedStatus === 'all' || 
        (this.selectedStatus === 'active' && user.status === 'active') ||
        (this.selectedStatus === 'suspended' && user.status === 'suspended') ||
        (this.selectedStatus === 'banned' && user.status === 'banned') ||
        (this.selectedStatus === 'inactive' && !user.isActive);
      
      return matchesSearch && matchesRole && matchesStatus;
    });
  }

  // Modal methods
  openSuspendModal(user: User): void {
    this.selectedUserId = user._id;
    this.selectedUserName = `${user.firstName} ${user.lastName}`;
    this.isSuspendModalOpen = true;
  }

  closeSuspendModal(): void {
    this.isSuspendModalOpen = false;
    this.selectedUserId = null;
  }

  openBanModal(user: User): void {
    this.selectedUserId = user._id;
    this.selectedUserName = `${user.firstName} ${user.lastName}`;
    this.isBanModalOpen = true;
  }

  closeBanModal(): void {
    this.isBanModalOpen = false;
    this.selectedUserId = null;
  }

  openReactivateModal(user: User): void {
    this.selectedUserId = user._id;
    this.selectedUserName = `${user.firstName} ${user.lastName}`;
    this.isReactivateModalOpen = true;
  }

  closeReactivateModal(): void {
    this.isReactivateModalOpen = false;
    this.selectedUserId = null;
  }

  // Action methods
  confirmSuspend(): void {
    if (!this.selectedUserId) return;
    
    this.usersService.suspendUser(this.selectedUserId).subscribe({
      next: (updatedUser) => {
        this.updateUserInList(updatedUser);
        this.toastr.success(`User ${this.selectedUserName} has been suspended`, 'Success');
        this.closeSuspendModal();
      },
      error: (err) => {
        console.error('Failed to suspend user:', err);
        this.toastr.error('Failed to suspend user', 'Error');
        this.closeSuspendModal();
      }
    });
  }

  confirmBan(): void {
    if (!this.selectedUserId) return;
    
    this.usersService.banUser(this.selectedUserId).subscribe({
      next: (updatedUser) => {
        this.updateUserInList(updatedUser);
        this.toastr.success(`User ${this.selectedUserName} has been banned`, 'Success');
        this.closeBanModal();
      },
      error: (err) => {
        console.error('Failed to ban user:', err);
        this.toastr.error('Failed to ban user', 'Error');
        this.closeBanModal();
      }
    });
  }

  confirmReactivate(): void {
    if (!this.selectedUserId) return;
    
    this.usersService.reactivateUser(this.selectedUserId).subscribe({
      next: (updatedUser) => {
        this.updateUserInList(updatedUser);
        this.toastr.success(`User ${this.selectedUserName} has been reactivated`, 'Success');
        this.closeReactivateModal();
      },
      error: (err) => {
        console.error('Failed to reactivate user:', err);
        this.toastr.error('Failed to reactivate user', 'Error');
        this.closeReactivateModal();
      }
    });
  }

  updateUserInList(updatedUser: User): void {
    const index = this.users.findIndex(u => u._id === updatedUser._id);
    if (index !== -1) {
      this.users[index] = updatedUser;
      this.filterUsers();
    }
  }

  deleteUser(userId: string): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.usersService.deleteUser(userId).subscribe({
        next: () => {
          this.users = this.users.filter(user => user._id !== userId);
          this.filterUsers();
          this.toastr.success('User has been deleted', 'Success');
        },
        error: (err) => {
          console.error('Failed to delete user:', err);
          this.toastr.error('Failed to delete user', 'Error');
        }
      });
    }
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'suspended':
        return 'bg-yellow-100 text-yellow-800';
      case 'banned':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  getRoleClass(userRole: string): string {
    switch (userRole) {
      case 'admin':
        return 'bg-blue-100 text-blue-800';
      case 'organizer':
        return 'bg-yellow-100 text-yellow-800';
      case 'user':
        return 'bg-gray-100 text-gray-800';
      default:
        return '';
    }
  }

  resetFilters(): void {
    this.selectedRole = 'all';
    this.selectedStatus = 'all';
    this.searchTerm = '';
    this.filterUsers();
  }
}