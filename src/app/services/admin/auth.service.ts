import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { CONSTANTS } from '../../constants'; // Adjust path as needed
import {throwError} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

login(email: string, password: string): Observable<any> {
  return this.http.post(`${this.apiUrl}/admin/login`, { email, password }).pipe(
    tap((res: any) => {
      console.log('Full login response:', res);
      
      const token = res.data?.accessToken || res.accessToken;
      const user = res.data?.user || res.user;
      
      if (token) {
        // Use synchronous storage operations
        localStorage.setItem(CONSTANTS.token, token);
        if (user) {
          localStorage.setItem('admin_user', JSON.stringify(user));
        }
        console.log('Token stored successfully');
      } else {
        console.error('Token not found in response');
        throw new Error('No token received');
      }
    }),
    catchError(error => {
      console.error('Login error:', error);
      return throwError(() => error); // Re-throw the error properly
    })
  );
}

  logout(): void {
    localStorage.removeItem(CONSTANTS.token);
    localStorage.removeItem('admin_user');
    this.router.navigate(['/admin/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(CONSTANTS.token) || sessionStorage.getItem(CONSTANTS.token);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // Get the current user from storage
  getCurrentUser(): any {
    const userData = localStorage.getItem('admin_user');
    return userData ? JSON.parse(userData) : null;
  }

  // Check if a user is an admin based on their role
  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user && user.role === 'admin';
  }
}