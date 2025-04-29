import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-custom-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './custom-alert.component.html',
})
export class CustomAlertComponent {
  @Input() message: string = '';
  @Input() type: 'success' | 'error' = 'success';
}
