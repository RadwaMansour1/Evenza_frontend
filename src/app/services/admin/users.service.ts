
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  role: 'admin' | 'organizer' | 'user';
  isActive: boolean;
  createdAt: string;
  googleSignup: boolean;
  isEmailVerified: boolean;
  userRole: string;
  status: 'active' | 'suspended' | 'banned';

}

@Injectable({ providedIn: 'root' })
export class UsersService {
  private apiUrl = 'https://evenzabackend-production-2fb4.up.railway.app/admin';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<{ data: User[] }>(`${this.apiUrl}/users`).pipe(
      map(response => response.data)
    );
  }
  getUserById(id: string): Observable<User> {
    return this.http.get<{ data: User }>(`${this.apiUrl}/users/${id}`).pipe(
      map(response => response.data)
    );
  }

  updateUserStatus(id: string, isActive: boolean): Observable<User> {
    return this.http.patch<{ data: User }>(
      `${this.apiUrl}/${id}/status`,
      { isActive }
    ).pipe(
      map(response => response.data)
    );
  }

  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  banUser(id: string): Observable<User> {
    return this.http.patch<User>(`${this.apiUrl}/users/${id}/ban`, {}).pipe(
      map(response => response as User)
    );
  }

  suspendUser(id: string): Observable<User> {
    return this.http.patch<User>(`${this.apiUrl}/users/${id}/suspend`, {}).pipe(
      map(response => response as User)
    );
  }

  reactivateUser(id: string): Observable<User> {
    return this.http.patch<User>(`${this.apiUrl}/${id}/reactivate`, {}).pipe(
      map(response => response as User)
    );
  }
}
