import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


export interface DocumentUpload {
  _id: string;
  documentName: string;
  documentType: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  updatedAt: string;
}
@Injectable({
  providedIn: 'root',
})
export class UploadDocumentsService {
  private baseUrl = 'https://evenzabackend-production-2fb4.up.railway.app/upload-document';

  constructor(private http: HttpClient) {}
  //the backend wraps the documents array inside a data field.
  getAllDocuments(): Observable<{ data: DocumentUpload[] }> {
    return this.http.get<{ data: DocumentUpload[] }>(`${this.baseUrl}`);
  }


  approveDocument(documentId: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/approve/${documentId}`, {});
  }
  rejectDocument(documentId: string): Observable<any> {
    return this.http.patch(`${this.baseUrl}/reject/${documentId}`, {});
  }
  deleteDocument(documentId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${documentId}`);
  }
}

