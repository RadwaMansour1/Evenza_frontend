// user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Profile } from '../../models/profile.model';
import { appendIfExists } from '../../helpers/form-data.util';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000/profile/';

  constructor(private http: HttpClient) {}

  // getProfile(): Observable<Profile> {
  //   return this.http.get<Profile>(`${this.apiUrl}/${id}`);
  // }
  getProfile(userId: string): Observable<any> {
    return this.http.get(`http://localhost:3000/profile/${userId}`);
  }


  changePassword(oldPassword: string, newPassword: string): Observable<any> {
    const token = localStorage.getItem('access_token'); 
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);


    return this.http.patch(`http://localhost:3000/users/change-password`, {
      oldPassword,
      newPassword
    }, { headers });
  }

    updateProfile(formData: FormData): Observable<any> {

    const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
 
    if(token){
      console.log(token);

    }
  
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

  
    return this.http.post('http://localhost:3000/profile/update', formData , { headers } );
  }
}

