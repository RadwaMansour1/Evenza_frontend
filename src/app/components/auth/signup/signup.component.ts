import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { User } from '../../../models/user.model';
import { HttpClientModule } from '@angular/common/http';
import { GoogleAuthButtonComponent } from '../../google-auth-button/google-auth-button.component';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { SnackbarService } from '../../../services/notification/snackbar.service';
import { CONSTANTS } from '../../../constants';

@Component({
  selector: 'app-signup',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    GoogleAuthButtonComponent,
    RouterModule,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  signUpForm: FormGroup;
  isLoading: boolean = false;
  emailExistsError: string | null = null;
  googleClientId =
    '153826849194-115il10f9m3v1ddcdb0bd161t2v70pih.apps.googleusercontent.com';
  googleCallback = (response: any) => this.signupWithGoogle(response);

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackbar: SnackbarService
  ) {
    this.signUpForm = this.fb.group(
      {
        firstName: [
          '',
          [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(20),
            Validators.pattern(/^[A-Za-z]+$/),
          ],
        ],
        lastName: [
          '',
          [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(20),
            Validators.pattern(/^[A-Za-z]+$/),
          ],
        ],
        email: [
          '',
          [Validators.required, Validators.email, Validators.maxLength(50)],
        ],
        userRole: ['', [Validators.required]],
        acceptTerms: [false, [Validators.requiredTrue]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            this.passwordStrengthValidator(),
          ],
        ],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordsMatchValidator }
    );
  }

  signupWithGoogle(response: any) {
    if (response) {
      const payload = this.decodeToken(response.credential);
      console.log('Google Payload:', payload);

      const user = {
        firstName: payload.given_name || '',
        lastName: payload.family_name || '',
        email: payload.email || '',
        provider: 'google',
        providerId: payload.sub,
        isVerified: true,
      };

      this.authService.signupWithGoogle(user).subscribe({
        next: (res) => {
          console.log('Google Signup Successfully', res);
          const accessToken = response.credential;
          console.log('Access Token:', accessToken);
          localStorage.setItem(CONSTANTS.token, response.credential);
          this.router.navigate(['/select-role'], {
            queryParams: { email: user.email },
          });
        },
        error: (err) => {
          console.error('Google Signup Failed', err);
        },
      });
    }
  }

  signupWithFacebook() {
    this.authService.signupWithFacebook();
  }

  private decodeToken(token: string): any {
    return JSON.parse(atob(token.split('.')[1]));
  }
  // Password strength validator
  passwordStrengthValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) return null;
      const hasUpper = /[A-Z]/.test(value);
      const hasLower = /[a-z]/.test(value);
      const hasNumber = /[0-9]/.test(value);
      const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(value);
      const valid = hasUpper && hasLower && hasNumber && hasSpecial;
      // return valid ? null : { weakPassword: true };
      return hasUpper && hasLower && hasNumber && hasSpecial
        ? null
        : { weakPassword: true };
    };
  }
  // Confirm password matches
  passwordsMatchValidator: ValidatorFn = (
    formGroup: AbstractControl
  ): ValidationErrors | null => {
    const password = formGroup.get('password')?.value;
    const confirm = formGroup.get('confirmPassword')?.value;
    return password === confirm ? null : { passwordsMismatch: true };
  };
  // Assuming you have a property to hold the selected file in your component
  selectedImageFile: File | undefined;

  // Method to handle file selection (example)
  onFileSelected(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList && fileList.length > 0) {
      this.selectedImageFile = fileList[0];
      // Optionally: Display image preview
    } else {
      this.selectedImageFile = undefined;
    }
  }

  onSubmit(): void {
    if (this.signUpForm.invalid) {
      this.signUpForm.markAllAsTouched(); // Mark fields to show validation errors
      return;
    }

    this.isLoading = true; // Set loading indicator

    // Prepare user data (excluding role, as it's passed separately)
    const user: User = {
      firstName: this.signUpForm.value.firstName,
      lastName: this.signUpForm.value.lastName,
      email: this.signUpForm.value.email,
      acceptTerms: this.signUpForm.value.acceptTerms,
      password: this.signUpForm.value.password,
      userRole: this.signUpForm.value.userRole as 'organizer' | 'user',
    };
    const selectedRole = this.signUpForm.value.userRole as 'organizer' | 'user';

    console.log('User Data:', user);
    console.log('UserRole before sending:', selectedRole);
    console.log('Image File:', this.selectedImageFile);

    this.authService
      .signupWithRole(user, selectedRole, this.selectedImageFile)
      .subscribe({
        // Pass the file
        next: (res) => {
          console.log('Signup Successfully', res);
          this.emailExistsError = null; // Assuming you have this property
          this.signUpForm.reset();
          this.selectedImageFile = undefined; // Clear selected file
          this.isLoading = false;

          // Navigate to verify email page
          this.router.navigate(['/verify-email'], {
            queryParams: { email: user.email },
          });
        },
        error: (err) => {
          this.isLoading = false;
          if (err.status === 409) {
            // Conflict (Email likely exists)
            this.signUpForm.get('email')?.setErrors({ emailExists: true });
            this.emailExistsError = 'Email already exists.'; // Set a message
          } else if (err.status === 400) {
            // Bad Request (Validation likely failed)
            console.error('Signup Validation Error:', err.error); // Log the actual error response from backend if available
            // You might want to display a generic error or parse err.error.message if backend sends details
            this.emailExistsError = 'Signup failed. Please check your input.'; // Generic message
          } else {
            console.error('Signup Error:', err);
            this.emailExistsError = 'An unexpected error occurred.'; // Generic message
          }
        },
      });
  }
}
