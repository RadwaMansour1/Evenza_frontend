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
import { CONSTANTS } from '../../../constants';

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
      localStorage.getItem(CONSTANTS.userData) ||
      sessionStorage.getItem(CONSTANTS.userData);
    if (userData) {
      const user = JSON.parse(userData);
      this.router.navigate(['/home']);
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

  // loginWithGoogle(response: any) {
  //   if (response) {
  //     const payload = this.decodeToken(response.credential);

  //     sessionStorage.setItem(CONSTANTS.userData, JSON.stringify(payload));
  //     sessionStorage.setItem(CONSTANTS.token, response.credential);

  //     //navigation
  //     if (payload.role == 'user') {
  //       this.router.navigate(['/home']);
  //     } else {
  //       this.router.navigate(['/organizer/home']);
  //     }

  //     //send the token to the server for verification
  //   }
  // }

  //fix login to check if user found login else signUp as a newOne
  // loginWithGoogle(response: any) {
  //   if (response) {
  //     const payload = this.decodeToken(response.credential);
  //     const email = payload.email;

  //     console.log("Decoded payload:", payload);
  //     console.log("Email:", email);

  //     sessionStorage.setItem(CONSTANTS.userData, JSON.stringify(payload));
  //     sessionStorage.setItem(CONSTANTS.token, response.credential);

  //     this.authService.checkIfUserExists(email).subscribe(
  //       (userExistsResponse) => {
  //         console.log('User exists check response:', userExistsResponse);
  //         if (userExistsResponse) {
  //           console.log("User exists, navigating to /home");
  //           sessionStorage.setItem(CONSTANTS.userData, JSON.stringify(payload));
  //           this.router.navigate(['/home']);
  //         } else {
  //           console.log("User does not exist, navigating to /select-role");

  //           //create user for back end dto
  //           const user = {
  //             firstName: payload.given_name || '',
  //             lastName: payload.family_name || '',
  //             email: payload.email || '',
  //             provider: 'google',
  //             providerId: payload.sub,
  //             isVerified: true,
  //             // imageURL: payload.picture || 'https://default-image-url.com/default.jpg',
  //           };

  //           //create form data
  //           const formData = new FormData();
  //           formData.append('firstName', user.firstName);
  //           formData.append('lastName', user.lastName);
  //           formData.append('email', user.email);
  //           formData.append('provider', user.provider);
  //           formData.append('providerId', user.providerId);
  //           formData.append('isVerified', String(user.isVerified));
  //           // formData.append('imageURL', user.imageURL);

  //           this.authService.signupWithGoogle(formData).subscribe({
  //             next: (signupResponse) => {

  //               const accessToken = signupResponse.data.accessToken;
  //               console.log('Access Token (from Nest):', accessToken);
  //               localStorage.setItem(CONSTANTS.token, accessToken);

  //               console.log('User registered successfully:', signupResponse);
  //               // const accessToken = response.credential;
  //               console.log('Access Token:', accessToken);
  //               sessionStorage.setItem(CONSTANTS.token, response.credential);
  //               sessionStorage.setItem(CONSTANTS.userData, JSON.stringify(signupResponse));
  //               this.router.navigate(['/select-role'], {
  //                 queryParams: { email: user.email },
  //               });
  //             },
  //             error:(err)=>{
  //               console.error('Google Signup Failed', err);
  //             },
  //           });
  //         }
  //       },
  //       (error) => {
  //         console.error('Error checking user existence', error);
  //         this.errorMessage = 'Error, please try again';
  //       }
  //     );
  //   }
  // }

  loginWithGoogle(response: any) {
    if (!response) return;

    const payload = this.decodeToken(response.credential);
    const email = payload.email;
    this.authService.checkIfUserExists(email).subscribe({
      next: (res) => {
        console.log('response from back end : ', res);
        if (res.data.userExists) {
          console.log('user found navigating to home');
          const token = res.data.accessToken!;
          console.log('token from nest(): ', token);
          localStorage.setItem(CONSTANTS.token, token);
          sessionStorage.setItem(
            CONSTANTS.userData,
            JSON.stringify(res.data.user)
          );

          this.router.navigate(['/home']);
          return;
        } else {
          console.log('user not found go to signup');

          const user = {
            firstName: payload.given_name || '',
            lastName: payload.family_name || '',
            email: payload.email || '',
            provider: 'google',
            providerId: payload.sub,
            isVerified: true,
          };

          const formData = new FormData();
          Object.entries(user).forEach(([key, value]) =>
            formData.append(key, value.toString())
          );

          this.authService.signupWithGoogle(formData).subscribe({
            next: (signupResponse) => {
              const accessToken = signupResponse.data.accessToken;
              localStorage.setItem(CONSTANTS.token, accessToken);
              sessionStorage.setItem(
                CONSTANTS.userData,
                JSON.stringify(signupResponse.data.user)
              );
              this.router.navigate(['/select-role'], {
                queryParams: { email: user.email },
              });
            },
            error: (err) => {
              console.error('Google Signup Failed', err);
            },
          });
        }
      },
      error: (err) => {
        console.error('Error checking user existence', err);
        this.errorMessage = 'Error, please try again';
      },
    });
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
              localStorage.setItem(CONSTANTS.token, token);
            } else {
              sessionStorage.setItem(CONSTANTS.token, token);
            }

            const payload = this.decodeToken(token);
            console.log(payload);

            if (this.signInForm.value.rememberMe) {
              localStorage.setItem(CONSTANTS.userData, JSON.stringify(payload));
            } else {
              sessionStorage.setItem(
                CONSTANTS.userData,
                JSON.stringify(payload)
              );
            }
            if (payload.role == 'user') {
              this.router.navigate(['/home']);
              window.location.reload();
            } else this.router.navigate(['/organizer/home']);
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
