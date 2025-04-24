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
        'We accept major credit cards including Visa, Mastercard, American Express, and Discover. We also support payment via PayPal.',
      isOpen: false,
    },
    {
      question: 'Can I get a refund for my tickets?',
      answer:
        'Our refund policy varies depending on the event. Please check the specific event details page or our terms and conditions for information regarding refunds.',
      isOpen: false,
    },
    {
      question: 'How do I become an event organizer?',
      answer:
        'If you are interested in organizing events on our platform, please visit our "Organizers" page and fill out the application form. Our team will review your submission.',
      isOpen: false,
    },
    {
      question: 'Where can I find my tickets?',
      answer:
        'After completing your purchase, your tickets will be sent to the email address you provided during checkout. You can also access them from your account dashboard on our website.',
      isOpen: false,
    },
    // Add more FAQ items here
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
