import { Component, ViewChild, ElementRef, AfterViewChecked, OnInit, Output, EventEmitter, inject } from '@angular/core';
import { ChatbotService } from '../../services/chatbot/chatbot.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroChatBubbleLeftSolid, heroPaperAirplaneSolid, heroXMarkSolid } from '@ng-icons/heroicons/solid';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [FormsModule, CommonModule, NgIcon],
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css'],
  viewProviders:[provideIcons({heroXMarkSolid, heroChatBubbleLeftSolid, heroPaperAirplaneSolid})]
})
export class ChatbotComponent implements AfterViewChecked ,OnInit {
  userMessage = '';
  messages: { sender: 'user' | 'bot'; text: string | SafeHtml; timestamp: string }[] = [];
  loading = false;
  isChatOpen = false;

  @ViewChild('chatBox') chatBox!: ElementRef;
  @Output() openChange = new EventEmitter<boolean>();
  private sanitizer = inject(DomSanitizer);


  constructor(private chatbotService: ChatbotService) {}

  ngOnInit() {
    this.addBotMessage("👋 Hi there! I'm Evie, your Evenza assistant. How can I help you today?");
  }

  ngAfterViewChecked() {
    if (this.isChatOpen) {
      this.scrollToBottom();
    }
  }

  private scrollToBottom() {
    try {
      this.chatBox.nativeElement.scrollTop = this.chatBox.nativeElement.scrollHeight;
    } catch (err) {
      console.error('Scroll error:', err);
    }
  }

  toggleChat() {
    this.isChatOpen = !this.isChatOpen;
    this.openChange.emit(this.isChatOpen);

  }

  sendMessage() {
    const trimmedMessage = this.userMessage.trim();
    if (!trimmedMessage) return;
    this.userMessage = trimmedMessage;

    this.addMessage('user', this.userMessage);
    this.loading = true;

    this.chatbotService.sendMessage(this.userMessage).subscribe({
      next: (res) => {
        console.log('Response from server:', res);
        const botReply = res?.data?.botResponse;

        if (botReply && botReply.trim()) {
          const formattedReply = this.formatBotResponse(botReply);
          this.addMessage('bot', formattedReply);
        } else {
          this.addMessage('bot', 'No response from bot.');
        }

        this.userMessage = '';
        this.loading = false;
      },
      error: (err) => {
        console.error('Error from server:', err);
        this.addMessage('bot', 'Failed to connect to the bot.');
        this.loading = false;
      }
    });
  }

  private addMessage(sender: 'user' | 'bot', text: string | SafeHtml) {
    this.messages.push({ sender, text, timestamp: this.getCurrentTimestamp() });
  }

  private addBotMessage(text: string) {
    const formattedText = this.formatBotResponse(text);
    this.messages.push({ sender: 'bot', text: formattedText, timestamp: this.getCurrentTimestamp() });
  }

  private getCurrentTimestamp(): string {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  private formatBotResponse(text: string): SafeHtml {
    const formattedText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    return this.sanitizer.bypassSecurityTrustHtml(formattedText);
  }

}
