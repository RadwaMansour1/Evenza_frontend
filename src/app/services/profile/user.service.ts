import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Profile, ProfileResponse } from '../../models/profile.model';
import { appendIfExists } from '../../helpers/form-data.util';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000/users/my-profile';

  constructor(private http: HttpClient) {}


  getProfile(): Observable<Profile> {
    const token = localStorage.getItem('access_token') || sessionStorage.getItem('access_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<ProfileResponse>(this.apiUrl, { headers }).pipe(
      map(res => res.data)
    );
  }


  // updateProfile(profileData: Profile): Observable<Profile> {
  //   const formData = new FormData();

  //   formData.append('firstName', profileData.firstName);
  //   formData.append('lastName', profileData.lastName);
  //   // formData.append('phone1', profileData.phone1);
  //   // formData.append('country', profileData.country);
  //   // formData.append('gender', profileData.gender);
  //   // formData.append('address', profileData.address);
  //   // formData.append('city', profileData.city);
  //   // formData.append('dateOfBirth', profileData.dateOfBirth);
  //   // appendIfExists(formData, 'phone2', profileData.phone2);
  //   // appendIfExists(formData, 'phone2', profileData.state);
  //   // appendIfExists(formData, 'phone2', profileData.zipCode);

  //   // if (profileData.profileImage) {
  //   //   formData.append('profileImage', profileData.profileImage);
  //   // }

  //   return this.http.put<Profile>(`${this.apiUrl}/my-profile`, formData);
  // }

  // appendIfExists(formData: FormData, key: string, value: any) {
  //   if (value !== null && value !== undefined && value !== '') {
  //     formData.append(key, value);
  //   }
  // }

}
