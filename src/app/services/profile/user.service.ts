// user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Profile } from '../../models/profile.model';
import { appendIfExists } from '../../helpers/form-data.util';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api/profile';

  constructor(private http: HttpClient) {}

  getProfile(): Observable<Profile> {
    return this.http.get<Profile>(`${this.apiUrl}/personal-information`);
  }

  updateProfile(profileData: Profile): Observable<any> {
    const formData = new FormData();
  
    formData.append('firstName', profileData.firstName);
    formData.append('lastName', profileData.lastName);
    formData.append('phone1', profileData.phone1);
    formData.append('country', profileData.country);
    formData.append('gender', profileData.gender);
    formData.append('address', profileData.address);
    formData.append('city', profileData.city);
    formData.append('dateOfBirth', profileData.dateOfBirth);
    appendIfExists(formData, 'phone2', profileData.phone2);
    appendIfExists(formData, 'phone2', profileData.state);
    appendIfExists(formData, 'phone2', profileData.zipCode);
  
    if (profileData.profileImage) {
      formData.append('profileImage', profileData.profileImage); // الصورة
    }
  
    return this.http.put(`http://localhost:3000/api/profile`, formData);
  }
  
}
