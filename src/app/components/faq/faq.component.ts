import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  heroChevronDown,
  heroQuestionMarkCircle,
} from '@ng-icons/heroicons/outline';
import { TranslateModule } from '@ngx-translate/core';

// Interface to define the structure of an FAQ item
interface FaqItem {
  question: string;
  answer: string;
  isOpen: boolean;
}

@Component({
  selector: 'app-faq',
  imports: [CommonModule, NgIcon, TranslateModule],
  templateUrl: './faq.component.html',
  providers: [provideIcons({ heroChevronDown, heroQuestionMarkCircle })],
})
export class FaqComponent {
  // Array to hold your FAQ data
  faqs: FaqItem[] = [
    {
      question: 'faq.q1',
      answer: 'faq.a1',
      isOpen: false,
    },
    {
      question: 'faq.q2',
      answer: 'faq.a2',
      isOpen: false,
    },
    {
      question: 'faq.q3',
      answer: 'faq.a3',
      isOpen: false,
    },
    {
      question: 'faq.q4',
      answer: 'faq.a4',
      isOpen: false,
    },
    {
      question: 'faq.q5',
      answer: 'faq.a5',
      isOpen: false,
    },
    {
      question: 'faq.q6',
      answer: 'faq.a6',
      isOpen: false,
    },
    {
      question: 'faq.q7',
      answer: 'faq.a7',
      isOpen: false,
    },
    {
      question: 'faq.q8',
      answer: 'faq.a8',
      isOpen: false,
    },
    {
      question: 'faq.q9',
      answer: 'faq.a9',
      isOpen: false,
    },
    {
      question: 'faq.q10',
      answer: 'faq.a10',
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
