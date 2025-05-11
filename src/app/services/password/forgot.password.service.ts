import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {
  private apiUrl = 'https://evenzabackend-production-2fb4.up.railway.app/auth/forgot-password';
  private resetPasswordUrl = 'https://evenzabackend-production-2fb4.up.railway.app/auth/reset-password';

  constructor(private http: HttpClient) {}

  sendResetLink(email: string): Observable<any> {
    return this.http.post(this.apiUrl, { email });
  }

  resetPassword(token: string, newPassword: string): Observable<any> {
    return this.http.patch(this.resetPasswordUrl, { token, newPassword });
  }
}
