import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
export type SnackbarType = 'success' | 'error' | 'info' | 'warning';

@Injectable({ providedIn: 'root' })
export class SnackbarService {
  private messageSubject = new BehaviorSubject<{ message: string; type: SnackbarType } | null>(null);
  message$ = this.messageSubject.asObservable();

  show(message: string, type: SnackbarType = 'info') {
    this.messageSubject.next({ message, type });
    setTimeout(() => this.messageSubject.next(null), 3000); // نقدر من هنا يا شباب نتحكم في توقيت الإشعار 3 ث او اكتر
  }
}
