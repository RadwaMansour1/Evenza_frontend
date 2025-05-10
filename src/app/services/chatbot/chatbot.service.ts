import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Chatbot } from '../../models/chatbot.model';

@Injectable({
  providedIn: 'root',
})
export class ChatbotService {
  private baseUrl = 'https://evenzabackend-production-2fb4.up.railway.app/chatbot/chat';

  constructor(private http: HttpClient) {}

  sendMessage(message: string): Observable<Chatbot> {
    return this.http.post<Chatbot>(this.baseUrl, { message });
  }
}
