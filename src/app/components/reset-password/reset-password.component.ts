import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ForgotPasswordService } from '../../services/password/forgot.password.service';

@Component({
  selector: 'app-reset-password',
  imports: [CommonModule,FormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {
  newPassword = '';
  confirmPassword = '';
  token = '';

  constructor(
    private route: ActivatedRoute,
    private resetPasswordService: ForgotPasswordService
  ) {}

  ngOnInit() {
    this.token = this.route.snapshot.queryParamMap.get('token') || '';
  }

  onSubmit() {
    console.log('New password:', this.newPassword);
    console.log('Confirm password:', this.confirmPassword);
    if (this.newPassword !== this.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    this.resetPasswordService.resetPassword(this.token, this.newPassword)
      .subscribe({
        next: () => {
          alert('Password reset successfully!');
        },
        error: (err) => {
          console.error(err);
        }
      });
  }
}
