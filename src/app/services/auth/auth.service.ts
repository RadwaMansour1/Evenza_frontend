import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { User } from '../../models/user.model';
import { FacebookAuthService } from './facebook-auth.service';
import { LoginRequest } from '../../models/login.model';
import { CONSTANTS } from '../../constants';
import { CONSTANTS } from '../../constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000'; // Replace with your API URL
  private token: string | null = null; // Store the token here
  private emailSource = new BehaviorSubject<string | null>(null); // BehaviorSubject to store the email
  currentEmail$ = this.emailSource.asObservable(); // Observable to expose the email to other components

  constructor(
    private http: HttpClient,
    private router: Router,
    private fbService: FacebookAuthService
  ) {}

  isAuthenticated(): boolean {
    return (
      sessionStorage.getItem(CONSTANTS.token) !== null ||
      localStorage.getItem(CONSTANTS.token) !== null
    );
  }
  // set the token in localStorage or sessionStorage
  setToken(token: string): void {
    localStorage.setItem(CONSTANTS.token, token);
    sessionStorage.setItem(CONSTANTS.token, token);
  }
  // get the token from localStorage or sessionStorage
  getToken(): string | null {
    let token = sessionStorage.getItem(CONSTANTS.token);
    if (!token) {
      token = localStorage.getItem(CONSTANTS.token);
    }
    return token;
  }
  // clear the token from localStorage and sessionStorage
  clearToken(): void {
    localStorage.removeItem(CONSTANTS.token);
    sessionStorage.removeItem(CONSTANTS.token);
  }


  canAccess() {
    if (!this.isAuthenticated()) {
      //redirect to login page
      this.router.navigate(['/login']);
    }
  }

  register(name: string, email: string, password: string) {
    //send data to register api
    return this.http
      .post('http://localhost:3000/register', { name, email, password })
      .subscribe((res: any) => {
        console.log(res);
        if (res.success) {
          alert('Registration successful');
          this.router.navigate(['/login']);
        } else {
          alert('Registration failed');
        }
      });
  }

  login(userData: LoginRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/sign-in`, userData).pipe(
      tap((response: any) => {
        if (response.success) {
          localStorage.setItem(CONSTANTS.token, response.token);
          localStorage.setItem(CONSTANTS.userData, JSON.stringify(response.user));
          this.token = response.token;
        }
      })
    );
  }

  signupWithRole(
    userData: User,
    selectedRole: 'organizer' | 'user',
    imageFile?: File
  ): Observable<any> {
    const formData = new FormData();
    formData.append('firstName', userData.firstName);
    formData.append('lastName', userData.lastName);
    formData.append('email', userData.email);
    formData.append('password', userData.password);
    formData.append('acceptTerms', String(userData.acceptTerms));
    formData.append('userRole', selectedRole);
    if (imageFile) {
      formData.append('imageUrl', imageFile, imageFile.name);
    }
    return this.http.post(`${this.apiUrl}/auth/signup/form`, formData);
  }

  setUserRole(user: any) {
    return this.http.post('http://localhost:3000/auth/set-role', user);
  }

  updateUserRole(data: { email: string; role: string }) {
    return this.http.post('http://localhost:3000/auth/set-role', data);
  }

  signupWithGoogle(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/signup/google`, user).pipe(
      tap((res: any) => {
        if (res.accessToken) {
          localStorage.setItem(CONSTANTS.token, res.accessToken);
        }
      })
    );
  }

  signupWithFacebook() {
    this.fbService
      .loginWithFacebook()
      .then((user) => {
        console.log('User Info:', user);
        const [firstName, lastName = ''] = user.name.split(' ');
        const payload = {
          firstName,
          lastName,
          email: user.email,
          provider: 'facebook',
          providerId: user.facebookId,
          isVerified: true,
        };

        this.http
          .post(`${this.apiUrl}/auth/signup/facebook`, payload)
          .subscribe((res: any) => {
            localStorage.setItem(CONSTANTS.token, res.accessToken); // تأكد إنها اسمها accessToken مش token
            console.log('Login success!');
            this.router.navigate(['/select-role']);
          });
      })
      .catch((err) => {
        console.error('Facebook login error:', err);
      });
  }

  verifyCode(email: string, code: string) {
    return this.http
      .post<any>(`${this.apiUrl}/auth/verify-email`, { email, code })
      .pipe(
        tap((response) => {
          // console.log('Backend response:', response);
          const accessToken = response.accessToken;
          if (accessToken) {
            localStorage.setItem(CONSTANTS.token, accessToken);
          }
        })
      );
  }

  resendCode(email: string) {
    return this.http.post(`${this.apiUrl}/auth/resend-code`, { email });
  }

  logout() {
    localStorage.removeItem(CONSTANTS.token);
    localStorage.removeItem('userData');
    sessionStorage.removeItem(CONSTANTS.token);
    sessionStorage.removeItem('userData');
    this.router.navigate(['/login']);
  }

  changePassword(oldPassword: string, newPassword: string): Observable<any> {
    const token = localStorage.getItem(CONSTANTS.token);
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.patch(
      `${this.apiUrl}/auth/change-password`,
      {
        oldPassword,
        newPassword,
      },
      { headers }
    );
  }
  isloggedIn() {
    return (
      sessionStorage.getItem(CONSTANTS.token) !== null ||
      localStorage.getItem(CONSTANTS.token) !== null
    );
  }
}

