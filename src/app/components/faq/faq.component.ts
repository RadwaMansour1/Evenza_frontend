import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  heroChevronDown,
  heroQuestionMarkCircle,
} from '@ng-icons/heroicons/outline';

// Interface to define the structure of an FAQ item
interface FaqItem {
  question: string;
  answer: string;
  isOpen: boolean;
}

@Component({
  selector: 'app-faq',
  imports: [CommonModule, NgIcon],
  templateUrl: './faq.component.html',
  providers: [provideIcons({ heroChevronDown, heroQuestionMarkCircle })],
})
export class FaqComponent {
  // Array to hold your FAQ data
  faqs: FaqItem[] = [
    {
      question: 'How do I purchase tickets?',
      answer:
        'You can purchase tickets by browsing our events, selecting the one you\'re interested in, and clicking the "Book Now" button. Follow the checkout process to complete your purchase.',
      isOpen: false,
    },
    {
      question: 'What payment methods do you accept?',
      answer:
        'We accept major credit cards including Visa, Mastercard, American Express, and Discover. We also support payment via PayPal and Evenza Wallet.',
      isOpen: false,
    },
    {
      question: 'Can I get a refund for my tickets?',
      answer:
        "Refund policies vary by event. Generally, refunds are available up to 48 hours before the event starts. Check the specific event's details for its refund policy",
      isOpen: false,
    },
    {
      question: 'How do I become an event organizer?',
      answer:
        'To become an event organizer, sign up for an account and select "Organizer" as your role. You\'ll need to provide identification for verification before you can create events.',
      isOpen: false,
    },
    {
      question: 'Where can I find my tickets?',
      answer:
        'After purchasing, you can find your tickets in the "My Tickets" section of your account. They will also be sent to your registered email address.',
      isOpen: false,
    },
  ];

  toggleAnswer(item: FaqItem): void {
    this.faqs.forEach((faq) => {
      if (faq !== item && faq.isOpen) {
        faq.isOpen = false;
      }
    });
    item.isOpen = !item.isOpen;
  }
}
