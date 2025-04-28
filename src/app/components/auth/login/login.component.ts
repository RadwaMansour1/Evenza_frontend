declare var google: any;
import { Component, inject, type OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import {
  Validators,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { LoginRequest } from '../../../models/login.model';
import { CommonModule } from '@angular/common';
import { NgIconsModule } from '@ng-icons/core';
import { AuthService } from '../../../services/auth/auth.service';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../../../services/language/language.service';

@Component({
  selector: 'app-login',
  imports: [
    RouterModule,
    ReactiveFormsModule,
    CommonModule,
    NgIconsModule,
    TranslateModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  private router = inject(Router);
  errorMessage: string | null = null;
  successMessage: string | null = null;
  signInForm: FormGroup;
  currentLang: 'en' | 'ar' = 'en';
  textArray = 'Evenza'.split('');

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private languageService: LanguageService
  ) {
    this.currentLang = this.languageService.getCurrentLanguage();
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      rememberMe: [false],
    });
  }

  ngOnInit(): void {
    const userData =
      localStorage.getItem('userData') || sessionStorage.getItem('userData');
    if (userData) {
      const user = JSON.parse(userData);
      this.router.navigate(['/profile']);
    } else {
      this.router.navigate(['/login']);
    }

    google.accounts.id.initialize({
      client_id:
        '153826849194-115il10f9m3v1ddcdb0bd161t2v70pih.apps.googleusercontent.com',
      callback: (resp: any) => this.loginWithGoogle(resp),
    });

    google.accounts.id.renderButton(document.getElementById('google-btn'), {
      theme: 'filled_blue',
      size: 'large',
      width: 300,
      text: 'signin_with',
      shape: 'rectangular',
      logo_alignment: 'left',
    });

    this.signInForm.valueChanges.subscribe(() => {
      if (this.errorMessage) {
        this.errorMessage = '';
      }
    });
  }

  toggleLanguage() {
    this.currentLang = this.currentLang === 'en' ? 'ar' : 'en';
    this.languageService.switchLanguage(this.currentLang);
  }

  private decodeToken(token: string): any {
    if (!token || typeof token !== 'string' || token.split('.').length !== 3) {
      console.error('Invalid token format', token);
      return null;
    }
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (error) {
      console.error('Error decoding token', error);
      return null;
    }
  }

  loginWithGoogle(response: any) {
    if (response) {
      const payload = this.decodeToken(response.credential);
      sessionStorage.setItem('userData', JSON.stringify(payload));
      this.router.navigate(['/profile']);
    }
  }

  onSubmit() {
    if (this.signInForm.valid) {
      const loginData: LoginRequest = {
        email: this.signInForm.value.email,
        password: this.signInForm.value.password,
      };

      this.authService.login(loginData).subscribe(
        (response) => {
          console.log('Login response:', response);
          const token = response.data?.access_token;

          if (token) {
            if (this.signInForm.value.rememberMe) {
              localStorage.setItem('access_token', token);
            } else {
              sessionStorage.setItem('access_token', token);
            }

            const payload = this.decodeToken(token);
            console.log(payload);

            if (this.signInForm.value.rememberMe) {
              localStorage.setItem('userData', JSON.stringify(payload));
            } else {
              sessionStorage.setItem('userData', JSON.stringify(payload));
            }
            if (payload.role == 'user') this.router.navigate(['/profile']);
            else this.router.navigate(['/organizer/dashboard']);
          }
        },
        (error) => {
          if (error.status === 401) {
            this.errorMessage = 'The Email or password is incorrect.';
          } else {
            this.errorMessage = 'An error occurred. Please try again later.';
          }
          console.error('Login failed', error);
        }
      );
    } else {
      this.errorMessage = 'Please fill in all required fields.';
      console.log('Form is invalid');
    }
  }
}
