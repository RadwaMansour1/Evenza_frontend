import { Component } from '@angular/core';
import { NgIconsModule } from '@ng-icons/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ForgotPasswordService } from '../../../services/password/forgot.password.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-forgot-password',
  imports: [NgIconsModule, FormsModule, CommonModule, RouterModule , TranslateModule],
  templateUrl: './forgot-password.component.html',
})
export class ForgotPasswordComponent {
  email: string = '';
  emailSent: boolean = false;
  submitted: boolean = false;

  constructor(private forgotPasswordService: ForgotPasswordService) {}

  onSubmit() {
    console.log('Sending email to:', this.email);
    this.forgotPasswordService.sendResetLink(this.email).subscribe(
      (response) => {
        this.emailSent = true;
        this.submitted = true;
        console.log('Email sent successfully:', response);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  backToForm() {
    this.emailSent = false;
  }
}
