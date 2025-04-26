import { RouterModule, Routes } from '@angular/router';
import {PaymentSuccessComponent} from './components/payment-success/payment-success.component';
import { PaymentComponent } from './components/payment/payment.component';
import { NgModule } from '@angular/core';
import { RefundComponent } from './components/refund/refund.component';

export const routes: Routes = [
    {
        path:"",component:PaymentComponent
    },
    {
        path:"refund",component:RefundComponent
    },
    {
        path:"success",component:PaymentSuccessComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule{}