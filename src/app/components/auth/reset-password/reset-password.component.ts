import { NgIcon, provideIcons } from '@ng-icons/core';
import { CommonModule, formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgModel, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ForgotPasswordService } from '../../../services/password/forgot.password.service';
import { AuthService } from '../../../services/auth/auth.service';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CONSTANTS } from '../../../constants';
import { featherKey, featherShield, featherSmartphone } from '@ng-icons/feather-icons';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NgxSpinnerService, NgxSpinnerModule } from 'ngx-spinner';


@Component({
  selector: 'app-reset-password',
  imports: [CommonModule, FormsModule,ReactiveFormsModule,NgIcon,MatSlideToggleModule,TranslateModule,NgxSpinnerModule
],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css',
  viewProviders:[provideIcons({featherShield,featherKey,featherSmartphone})]
})
export class ResetPasswordComponent {
  // newPassword = '';
  // confirmPassword = '';
  // token = '';

  // olPasswordFocused: boolean = false;
  // oldPassword: string = '';
  // newPasswordFocused: boolean = false;
  // newPassword: string = '';
  // confirmPasswordFocused: boolean = false;
  // confirmPassword: string = '';
  // errorMessage: string = '';
  // successMessage: string = '';
  // passwordForm: any;

  // constructor(
  //   private route: ActivatedRoute,
  //   private resetPasswordService: ForgotPasswordService,
  //   private authService: AuthService
  // ) {}

  // ngOnInit() {
  //   this.token = this.route.snapshot.queryParamMap.get('token') || '';
  // }

  // onSubmit() {
  //   console.log('New password:', this.newPassword);
  //   console.log('Confirm password:', this.confirmPassword);
  //   if (this.newPassword !== this.confirmPassword) {
  //     alert('Passwords do not match');
  //     return;
    // }

  //   this.resetPasswordService.resetPassword(this.token, this.newPassword)
  //     .subscribe({
  //       next: () => {
  //         alert('Password reset successfully!');
  //       },
  //       error: (err) => {
  //         console.error(err);
  //       }
  //     });
  // }
  //   changePassword() {
  //     // تحقق من تطابق كلمة المرور الجديدة مع التأكيد
  //     if (this.newPassword !== this.confirmPassword) {
  //       this.errorMessage = 'New password and confirm password do not match';
  //       return;
  //       this.authService.changePassword(this.oldPassword, this.newPassword).subscribe({
  //         next: (res) => {
  //           this.successMessage = res.message; // رسالة النجاح
  //           this.errorMessage = ''; // إعادة تعيين رسالة الخطأ
  //         },
  //         error: (err) => {
  //           this.errorMessage = err.error.message || 'An error occurred'; // رسالة الخطأ
  //           this.successMessage = ''; // إعادة تعيين رسالة النجاح
  //         }
  //       });
  //     }
  // }
  // changePassword() {
  //   // تحقق من تطابق كلمة المرور الجديدة مع التأكيد
  //   if (this.newPassword !== this.confirmPassword) {
  //     this.errorMessage = 'New password and confirm password do not match';
  //     return; // هذا السطر يمنع تنفيذ باقي الدالة في حالة عدم تطابق كلمات المرور
  //   }

  //   // استدعاء الخدمة لتغيير كلمة المرور
  //   this.authService
  //     .changePassword(this.oldPassword, this.newPassword)
  //     .subscribe({
  //       next: (res) => {
  //         this.successMessage = res.message; // رسالة النجاح
  //         this.errorMessage = ''; // إعادة تعيين رسالة الخطأ
  //       },
  //       error: (err) => {
  //         this.errorMessage = err.error.message || 'An error occurred'; // رسالة الخطأ
  //         this.successMessage = ''; // إعادة تعيين رسالة النجاح
  //       },
  //     });
  // }


  passwordForm: FormGroup;
  errorMessage = '';
  successMessage = '';
  olPasswordFocused = false;
  newPasswordFocused = false;
  confirmPasswordFocused = false;
  securityForm: FormGroup;
  isLoading: boolean = false;

  // new
  passwordStrength: 'Weak' | 'Medium' | 'Strong' = 'Weak';
  lastPasswordChangeDate: Date | null = null;
  enableTwoWayVerification: 'Enabled' | 'Disabled' = 'Disabled';
  constructor(private fb: FormBuilder, private http: HttpClient,private spinner: NgxSpinnerService) {
    this.passwordForm = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    }, { validators: this.passwordMatchValidator });

    this.securityForm = this.fb.group({
      twoFactorEnabled: [false],
      emailNotifications: [false],
      sessionTimeout: [15],
    });
  }
  // new


  ngOnInit(): void {
    this.passwordForm = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
    // هنا بتحط المراقبة على حقل الباسورد الجديد
    this.passwordForm.get('newPassword')?.valueChanges.subscribe(password => {
      this.checkPasswordStrength(password);
    });
    // مراقبة Two-Factor Authentication
    this.securityForm.get('twoFactorEnabled')?.valueChanges.subscribe(value => {
      this.enableTwoWayVerification = value ? 'Enabled' : 'Disabled';
      this.updateSecurityPanel(value); // تستدعي فنكشن تحدث الـ UI

    });
    this.securityForm.get('emailNotifications')?.valueChanges.subscribe(value => {
      if (value) {
        // شغل الـ session management تلقائيًا لو emailNotifications مفعلة
        this.securityForm.get('sessionTimeout')?.enable();
      } else {
        this.securityForm.get('sessionTimeout')?.disable();
      }
    });
    // disable sessionTimeout مبدئيًا لو Email Notifications مش مفعلة
    if (!this.securityForm.get('emailNotifications')?.value) {
      this.securityForm.get('sessionTimeout')?.disable();
    }

  }
  updateSecurityPanel(value: any) {
    throw new Error('Method not implemented.');
  }

  checkPasswordStrength(password: string): void {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const lengthValid = password.length >= 8;

    let score = 0;
    if (hasUpperCase) score++;
    if (hasLowerCase) score++;
    if (hasNumbers) score++;
    if (hasSpecial) score++;
    if (lengthValid) score++;

    if (score <= 2) this.passwordStrength = 'Weak';
    else if (score === 3 || score === 4) this.passwordStrength = 'Medium';
    else if (score === 5) this.passwordStrength = 'Strong';
  }
  // ended here

  passwordMatchValidator(form: FormGroup) {
    const newPassword = form.get('newPassword')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return newPassword === confirmPassword ? null : { passwordMismatch: true };
  }

  onSubmit() {
    if (this.passwordForm.invalid) return;
    this.spinner.show();
    this.isLoading = true;
    const { oldPassword, newPassword } = this.passwordForm.value;
    const token = localStorage.getItem(CONSTANTS.token) || sessionStorage.getItem(CONSTANTS.token);
    console.log('token from storage : ',token);
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);


    this.http.post('https://evenzabackend-production-2fb4.up.railway.app/auth/change-password', { oldPassword, newPassword } , { headers })
    .subscribe({
      next: () => {
        this.spinner.hide();
        this.isLoading = false;
        this.successMessage = 'Password changed successfully';
        this.errorMessage = '';

        // new
        this.successMessage = 'Password updated successfully.';
        this.lastPasswordChangeDate = new Date(); // أو من backend
        // ended here
        this.passwordForm.reset();
      },
      error: (err) => {
        this.isLoading = false;
        this.spinner.hide();
        this.errorMessage = err?.error?.message || 'Something went wrong';
        this.successMessage = '';
      }
    });


    // if (this.securityForm.valid) {
    //   const securitySettings = this.securityForm.value;
    //   const token = localStorage.getItem(CONSTANTS.token) || sessionStorage.getItem(CONSTANTS.token);
    //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    //   this.http.post('https://evenzabackend-production-2fb4.up.railway.app/users/security-settings', securitySettings, { headers }).subscribe({
    //      next: () => {
    //       this.successMessage = 'Security settings updated successfully.';
    //     },
    //      error: (err) => {
    //       this.errorMessage = err?.error?.message || 'Failed to update security settings';
    //     }
    //   });

    // }
  }
}
