import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ForgotPasswordService } from '../../../services/password/forgot.password.service';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-reset-password',
  imports: [CommonModule, FormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css',
})
export class ResetPasswordComponent {
  // newPassword = '';
  // confirmPassword = '';
  token = '';

  olPasswordFocused: boolean = false;
  oldPassword: string = '';
  newPasswordFocused: boolean = false;
  newPassword: string = '';
  confirmPasswordFocused: boolean = false;
  confirmPassword: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private resetPasswordService: ForgotPasswordService,
    private authService: AuthService
  ) {}

  // ngOnInit() {
  //   this.token = this.route.snapshot.queryParamMap.get('token') || '';
  // }

  // onSubmit() {
  //   console.log('New password:', this.newPassword);
  //   console.log('Confirm password:', this.confirmPassword);
  //   if (this.newPassword !== this.confirmPassword) {
  //     alert('Passwords do not match');
  //     return;
  //   }

  //   this.resetPasswordService.resetPassword(this.token, this.newPassword)
  //     .subscribe({
  //       next: () => {
  //         alert('Password reset successfully!');
  //       },
  //       error: (err) => {
  //         console.error(err);
  //       }
  //     });
  // }
  //   changePassword() {
  //     // تحقق من تطابق كلمة المرور الجديدة مع التأكيد
  //     if (this.newPassword !== this.confirmPassword) {
  //       this.errorMessage = 'New password and confirm password do not match';
  //       return;
  //       this.authService.changePassword(this.oldPassword, this.newPassword).subscribe({
  //         next: (res) => {
  //           this.successMessage = res.message; // رسالة النجاح
  //           this.errorMessage = ''; // إعادة تعيين رسالة الخطأ
  //         },
  //         error: (err) => {
  //           this.errorMessage = err.error.message || 'An error occurred'; // رسالة الخطأ
  //           this.successMessage = ''; // إعادة تعيين رسالة النجاح
  //         }
  //       });
  //     }
  // }
  changePassword() {
    // تحقق من تطابق كلمة المرور الجديدة مع التأكيد
    if (this.newPassword !== this.confirmPassword) {
      this.errorMessage = 'New password and confirm password do not match';
      return; // هذا السطر يمنع تنفيذ باقي الدالة في حالة عدم تطابق كلمات المرور
    }

    // استدعاء الخدمة لتغيير كلمة المرور
    this.authService
      .changePassword(this.oldPassword, this.newPassword)
      .subscribe({
        next: (res) => {
          this.successMessage = res.message; // رسالة النجاح
          this.errorMessage = ''; // إعادة تعيين رسالة الخطأ
        },
        error: (err) => {
          this.errorMessage = err.error.message || 'An error occurred'; // رسالة الخطأ
          this.successMessage = ''; // إعادة تعيين رسالة النجاح
        },
      });
  }
}
