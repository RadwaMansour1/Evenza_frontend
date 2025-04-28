import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ForgotPasswordService } from '../../../services/password/forgot.password.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-set-new-password',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './set-new-password.component.html',
})
export class SetNewPasswordComponent implements OnInit {
  newPasswordForm: FormGroup;
  newPasswordFocused: boolean = false;
  confirmPasswordFocused: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';
  token: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private forgetPasswordService: ForgotPasswordService
  ) {
    // Initialize the form with custom password validator
    this.newPasswordForm = this.fb.group({
      newPassword: ['', [Validators.required, this.passwordValidator()]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.token = this.route.snapshot.queryParamMap.get('token') || '';
  }

  setNewPassword() {
    if (this.newPasswordForm.invalid) {
      return;
    }

    const { newPassword, confirmPassword } = this.newPasswordForm.value;

    if (newPassword !== confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    this.forgetPasswordService
      .resetPassword(this.token, newPassword)
      .subscribe({
        next: (res: any) => {
          console.log(res);
          this.successMessage = 'Password reset successfully';
          this.errorMessage = '';
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 1000);
        },
        error: (err) => {
          this.errorMessage = err.error.message || 'Something went wrong';
          this.successMessage = '';
        },
      });
  }
  // Custom password validator
  passwordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.value;

      const minLengthValid = password.length >= 8;
      const hasNumber = /\d/.test(password);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

      // Password validation: Must be at least 8 characters, contain a number, and have a special character
      if (minLengthValid && hasNumber && hasSpecialChar) {
        return null; // Validation passes
      }

      return {
        passwordInvalid:
          'Password must be at least 8 characters long, contain a number, and have a special character.',
      };
    };
  }
}
