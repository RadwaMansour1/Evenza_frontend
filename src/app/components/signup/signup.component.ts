import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { User } from '../../models/user.model';
import { HttpClientModule } from '@angular/common/http';
import { GoogleAuthButtonComponent } from "../google-auth-button/google-auth-button.component";
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { SnackbarService } from '../../services/notification/snackbar.service';



@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule, GoogleAuthButtonComponent ,RouterModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {


  signUpForm: FormGroup;
  isLoading: boolean = false;
  emailExistsError: string | null = null;
  googleClientId = '153826849194-115il10f9m3v1ddcdb0bd161t2v70pih.apps.googleusercontent.com';
  googleCallback = (response: any) => this.signupWithGoogle(response);
  
  constructor(private fb: FormBuilder , private authService: AuthService, private router: Router, private snackbar:SnackbarService) {
    this.signUpForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2),Validators.maxLength(20), Validators.pattern(/^[A-Za-z]+$/)]],
      lastName: ['', [Validators.required, Validators.minLength(2),Validators.maxLength(20), Validators.pattern(/^[A-Za-z]+$/)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(50),]],
      userRole: ['', [Validators.required]],
      acceptTerms: [false, [Validators.requiredTrue]],
      password: ['', [Validators.required, Validators.minLength(8), this.passwordStrengthValidator()]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordsMatchValidator });


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
          // localStorage.setItem('token', JSON.stringify(payload));
          const accessToken = response.credential;
          console.log('Access Token:', accessToken);
          localStorage.setItem('token', response.credential);
          this.router.navigate(['/select-role'], { queryParams: { email: user.email } });
        },
        error: (err) => {
          console.error('Google Signup Failed', err);
        }
      });
    }
  }

  signupWithFacebook(){
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
      return hasUpper && hasLower && hasNumber && hasSpecial ? null : { weakPassword: true };
    };
  }
  // Confirm password matches
  passwordsMatchValidator: ValidatorFn = (formGroup: AbstractControl): ValidationErrors | null => {
    const password = formGroup.get('password')?.value;
    const confirm = formGroup.get('confirmPassword')?.value;
    return password === confirm ? null : { passwordsMismatch: true };
  };
  onSubmit() {
    if (this.signUpForm.invalid) {
      this.signUpForm.markAllAsTouched();
      this.snackbar.show('Form is not compelte', 'error');
      return;
    }
    
    const user: User = {
      firstName: this.signUpForm.value.firstName,
      lastName: this.signUpForm.value.lastName,
      email: this.signUpForm.value.email,
      userRole: this.signUpForm.value.userRole,
      acceptTerms:this.signUpForm.value.acceptTerms,
      password: this.signUpForm.value.password
    };

    console.log('UserRole before sending:',this.signUpForm.value.userRole);

  
    this.authService.signup(user).subscribe({
      next: (res) => {
        console.log('Signup Successfully', res);
        this.emailExistsError = null;
        this.signUpForm.reset();
        this.isLoading = false;
  
        // ✅ لا تحفظ التوكن بعد الـ signup
        // const token = res.data?.access_token;
        // const payload = this.decodeToken(token);
        // sessionStorage.setItem('userData', JSON.stringify(payload));
  
        // ✅ توجيه المستخدم لتأكيد الإيميل فقط
        this.router.navigate(['/verify-email'], { queryParams: { email: user.email } });
      },
      error: (err) => {
        this.isLoading = false;
  
        if (err.status === 409) {
          this.signUpForm.get('email')?.setErrors({ emailExists: true });
        } else {
          console.error('Signup Error:', err);
        }
      }
    });
  }
  
} 


