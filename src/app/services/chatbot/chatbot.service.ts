import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Chatbot } from '../../models/chatbot.model';

@Injectable({
  providedIn: 'root',
})
export class ChatbotService {
  private baseUrl = 'http://localhost:3000/chatbot/chat';

  constructor(private http: HttpClient) {}

  sendMessage(message: string): Observable<Chatbot> {
    return this.http.post<Chatbot>(this.baseUrl, { message });
  }
}
