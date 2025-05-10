import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CONSTANTS } from '../../constants';

@Injectable({
  providedIn: 'root',
})
export class UploadDocService {
  private apiUrl = 'https://evenzabackend-production-2fb4.up.railway.app/upload-document';

  constructor(private httpClient: HttpClient) {}

  uploadNationalId(nationalIdImage: any): Observable<any> {
    const token =
      sessionStorage.getItem(CONSTANTS.token) ||
      localStorage.getItem(CONSTANTS.token);

    const formData = new FormData();
    formData.append('file', nationalIdImage as Blob);
    return this.httpClient.post<any>(`${this.apiUrl}`, formData, {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
