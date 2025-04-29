import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  ActivatedRoute,
  NavigationEnd,
  NavigationStart,
  Router,
} from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css'],
  imports: [ReactiveFormsModule],
})
export class VerifyEmailComponent implements OnInit {
  email: string = '';

  maskedEmail: string = '';
  verificationForm!: FormGroup;
  errorCount = 0;
  isLocked = false;
  isResendDisabled = false;
  cooldownSeconds = 60;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.verificationForm = this.fb.group({
      digit1: ['', [Validators.required]],
      digit2: ['', [Validators.required]],
      digit3: ['', [Validators.required]],
      digit4: ['', [Validators.required]],
    });

    this.route.queryParams.subscribe((params) => {
      console.log(params['email']);
      this.email = params['email'] || '';
      this.maskedEmail = this.getMaskedEmail(this.email);
    });
  }

  getMaskedEmail(email: string): string {
    const [local, domain] = email.split('@');
    return `${local.slice(0, 2)}**@${domain}`;
  }

  onSubmit() {
    console.log('Verifying email:', this.email);
    if (this.verificationForm.valid) {
      const code = Object.values(this.verificationForm.value).join('');
      this.authService.verifyCode(this.email, code).subscribe({
        next: (res) => {
          // console.log(res);
          // console.log('accessToken =>', res.data?.accessToken);
          sessionStorage.setItem('accessToken', res.data?.accessToken);

  
          // this.router.navigate(['/home'], { queryParams: { email: this.email } });

          sessionStorage.setItem('userRole', res.data?.user.userRole);
          if (res.data?.user.userRole == 'user')
            this.router.navigate(['/home']);
          else this.router.navigate(['/organizer/dashboard']);
        },
        error: () => {
          this.errorCount++;
          this.handleAttempts();
        },
      });
    }
  }

  resendCode() {
    if (this.isResendDisabled) return;
    this.authService.resendCode(this.email).subscribe(() => {
      this.startCooldown();
    });
  }

  startCooldown() {
    this.isResendDisabled = true;
    setTimeout(() => {
      this.isResendDisabled = false;
    }, this.cooldownSeconds * 1000);
  }

  handleAttempts() {
    if (this.errorCount >= 3) {
      this.isLocked = true;
      setTimeout(() => {
        this.errorCount = 0;
        this.isLocked = false;
      }, 15 * 60 * 1000); // 15 دقيقة
    }
  }
  handlePaste(event: ClipboardEvent) {
    const pastedText = event.clipboardData?.getData('text') || '';
    if (pastedText.length === 4 && /^\d{4}$/.test(pastedText)) {
      this.verificationForm.setValue({
        digit1: pastedText[0],
        digit2: pastedText[1],
        digit3: pastedText[2],
        digit4: pastedText[3],
      });

      setTimeout(() => {
        this.onSubmit();
      }, 200);
    }

    event.preventDefault();
  }

  onKeyUp(event: KeyboardEvent, nextInput: HTMLInputElement) {
    if ((event.target as HTMLInputElement).value.length === 1) {
      nextInput.focus();
    }
  }
}
