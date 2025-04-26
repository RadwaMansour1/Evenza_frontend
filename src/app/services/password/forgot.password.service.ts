import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {
  private apiUrl = 'http://localhost:3000/auth/forgot-password'; // رابط API في NestJS
  private resetPasswordUrl = 'http://localhost:3000/auth/reset-password';

  constructor(private http: HttpClient) {}

  sendResetLink(email: string): Observable<any> {
    return this.http.post(this.apiUrl, { email });
  }

  resetPassword(token: string, newPassword: string): Observable<any> {
    return this.http.patch(this.resetPasswordUrl, { token, newPassword });
  }
}
