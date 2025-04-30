import { Injectable } from '@angular/core';
import { appendIfExists } from '../../helpers/form-data.util';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CONSTANTS } from '../../constants';
import { map, Observable } from 'rxjs';
import { Profile, ProfileResponse } from '../../models/profile.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000/profile';

  constructor(private http: HttpClient ) {}


  getProfile(): Observable<any> {
    const token = localStorage.getItem(CONSTANTS.token)  || sessionStorage.getItem(CONSTANTS.token);
    console.log('tokeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeen:', token);
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.apiUrl}/`,{ headers });
    // return this.http.get<ProfileResponse>(this.apiUrl, { headers }).pipe(
    //   map(res => res.data)
    // );
  }

  updateProfile(profileData: FormData): Observable<any> {
  const token = localStorage.getItem(CONSTANTS.token) || sessionStorage.getItem(CONSTANTS.token);
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post(`${this.apiUrl}/update`, profileData , { headers });
  }


  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);


  //   return this.http.patch(`${this.apiUrl}/users/change-password`, {
  //     oldPassword,
  //     newPassword
  //   }, { headers });
  // }


  // updateProfile(profileData: Profile): Observable<any> {
  //   const formData = new FormData();

  //   formData.append('firstName', profileData.firstName);
  //   formData.append('lastName', profileData.lastName);
  //   formData.append('phone1', profileData.phone1);
  //   formData.append('country', profileData.country);
  //   formData.append('gender', profileData.gender);
  //   formData.append('address', profileData.address);
  //   formData.append('city', profileData.city);
  //   // formData.append('dateOfBirth', profileData.dateOfBirth);
  //   appendIfExists(formData, 'phone2', profileData.phone2);
  //   appendIfExists(formData, 'phone2', profileData.state);
  //   appendIfExists(formData, 'phone2', profileData.zipCode);

  //   if (profileData.profileImage) {
  //     formData.append('profileImage', profileData.profileImage); // الصورة
  //   }

  //   return this.http.put(`http://localhost:3000/api/profile`, formData);
  // }

}
