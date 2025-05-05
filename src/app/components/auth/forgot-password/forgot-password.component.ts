import { Component } from '@angular/core';
import { NgIconsModule } from '@ng-icons/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ForgotPasswordService } from '../../../services/password/forgot.password.service';
import { TranslateModule } from '@ngx-translate/core';
import { NgxSpinnerService, NgxSpinnerModule } from 'ngx-spinner';

@Component({
  selector: 'app-forgot-password',
  imports: [NgIconsModule, FormsModule, CommonModule, RouterModule , TranslateModule, NgxSpinnerModule],
  templateUrl: './forgot-password.component.html',
})
export class ForgotPasswordComponent {
  email: string = '';
  emailSent: boolean = false;
  submitted: boolean = false;

  constructor(private forgotPasswordService: ForgotPasswordService,private spinner: NgxSpinnerService) {}

  onSubmit() {
    this.submitted = true;
    this.spinner.show();

    console.log('Sending email to:', this.email);
    this.forgotPasswordService.sendResetLink(this.email).subscribe(
      (response) => {
        this.spinner.hide();
        this.emailSent = true;
        this.submitted = true;
        console.log('Email sent successfully:', response);
      },
      (error) => {
        this.spinner.hide();
        // this.emailSent = false;
        this.submitted = false;
        console.error(error);
      }
    );
  }

  backToForm() {
    this.emailSent = false;
  }
}
