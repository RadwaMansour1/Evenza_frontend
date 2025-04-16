import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PaymentComponent } from "./components/payment/payment.component";
import { RefundComponent } from "./components/refund/refund.component";

@Component({
  selector: 'app-root',
  imports: [PaymentComponent, RefundComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'evenza-frontend';
}
