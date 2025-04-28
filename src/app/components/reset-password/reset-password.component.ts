// import { CommonModule } from '@angular/common';
// import { Component } from '@angular/core';
// import { FormsModule, NgModel,  FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
// import { ActivatedRoute } from '@angular/router';
// import { ForgotPasswordService } from '../../services/password/forgot.password.service';
// import { AuthService } from '../../services/auth/auth.service';
// import { UserService } from '../../services/profile/user.service';



// @Component({
//   selector: 'app-reset-password',
//   imports: [CommonModule,FormsModule,ReactiveFormsModule],
//   templateUrl: './reset-password.component.html',
//   styleUrl: './reset-password.component.css'
// })
// export class ResetPasswordComponent {
//   // newPassword = '';
//   // confirmPassword = '';
//   token = '';


//   olPasswordFocused: boolean = false;
//   oldPassword:  string = '';
//   newPasswordFocused: boolean = false;
//   newPassword: string = '';
//   confirmPasswordFocused: boolean = false;
//   confirmPassword: string = '';
//   errorMessage: string = '';
//   successMessage: string = '';

//   constructor(
//     private route: ActivatedRoute,
//     private resetPasswordService: ForgotPasswordService,
//     private authService: AuthService,
//     private fb: FormBuilder,
//     private userService: UserService
//   ) {}

//   passwordForm = this.fb.group({
//     oldPassword: ['', Validators.required],
//     newPassword: ['', [Validators.required, Validators.minLength(6)]],
//   });




// // changePassword() {
// //   // تحقق من تطابق كلمة المرور الجديدة مع التأكيد
// //   if (this.newPassword !== this.confirmPassword) {
// //     this.errorMessage = 'New password and confirm password do not match';
// //     return; // هذا السطر يمنع تنفيذ باقي الدالة في حالة عدم تطابق كلمات المرور
// //   }

  
// //   // استدعاء الخدمة لتغيير كلمة المرور
// //   this.authService.changePassword(this.oldPassword, this.newPassword).subscribe({
// //     next: (res) => {
// //       this.successMessage = res.message; // رسالة النجاح
// //       this.errorMessage = ''; // إعادة تعيين رسالة الخطأ
// //     },
// //     error: (err) => {
// //       this.errorMessage = err.error.message || 'An error occurred'; // رسالة الخطأ
// //       this.successMessage = ''; // إعادة تعيين رسالة النجاح
// //     }
// //   });
// // }
// onSubmit() {
//   if (this.passwordForm.valid) {
//     this.userService.changePassword(this.passwordForm.value).subscribe({
//       next: (res) => {
//         this.successMessage = res.message;
//         this.errorMessage = '';
//         this.passwordForm.reset();
//       },
//       error: (err) => {
//         this.errorMessage = err.error.message || 'Error changing password';
//         this.successMessage = '';
//       }
//     });
//   }
// }
// }


// import { CommonModule } from '@angular/common';
// import { Component, type OnInit } from '@angular/core';
// import { FormBuilder, Validators, ReactiveFormsModule, FormsModule, type FormGroup } from '@angular/forms';
// import { UserService } from '../../services/profile/user.service';

// @Component({
//   selector: 'app-reset-password',
//   imports: [CommonModule, FormsModule, ReactiveFormsModule],
//   templateUrl: './reset-password.component.html',
//   styleUrl: './reset-password.component.css'
// })
// export class ResetPasswordComponent  implements OnInit{
//   successMessage = '';
//   errorMessage = '';
//   passwordForm!: FormGroup;

//   olPasswordFocused = false;
//   newPasswordFocused = false;
//   confirmPasswordFocused = false;

//   constructor(private fb: FormBuilder, private userService: UserService) {}
//   ngOnInit(): void {
//     this.passwordForm = this.fb.group({
//       oldPassword: ['', Validators.required],
//       newPassword: ['', [Validators.required, Validators.minLength(6)]],
//       confirmPassword: ['', Validators.required]
//     }, {
//       validators: this.passwordsMatchValidator 
//     });
//   }

//   onSubmit() {
//     const { oldPassword, newPassword, confirmPassword } = this.passwordForm.value;

//     if (newPassword !== confirmPassword) {
//       this.errorMessage = 'New password and confirm password do not match';
//       this.successMessage = '';
//       return;
//     }

    

//     this.userService.changePassword({ oldPassword, newPassword }).subscribe({
//       next: (res) => {
//         this.successMessage = res.message;
//         this.errorMessage = '';
//         this.passwordForm.reset();
//       },
//       error: (err) => {
//         this.errorMessage = err.error.message || 'Error changing password';
//         this.successMessage = '';
//       }
//     });
//   }
// }

import { CommonModule } from '@angular/common';
import { Component, type OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormsModule, type FormGroup, AbstractControl, ValidationErrors } from '@angular/forms';
import { UserService } from '../../services/profile/user.service';

@Component({
  selector: 'app-reset-password',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent implements OnInit {
  successMessage = '';
  errorMessage = '';
  passwordForm!: FormGroup;

  olPasswordFocused = false;
  newPasswordFocused = false;
  confirmPasswordFocused = false;

  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit(): void {
    this.passwordForm = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validators: this.passwordsMatchValidator
    });
  }

  passwordsMatchValidator(group: AbstractControl): ValidationErrors | null {
    const newPassword = group.get('newPassword')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return newPassword === confirmPassword ? null : { passwordMismatch: true };
  }

  onSubmit() {
    if (this.passwordForm.invalid) {
      this.errorMessage = 'Please fix the errors in the form.';
      this.successMessage = '';
      return;
    }

    const { oldPassword, newPassword } = this.passwordForm.value;

    this.userService.changePassword(oldPassword, newPassword).subscribe({
      next: (res) => {
        this.successMessage = res.message;
        this.errorMessage = '';
        this.passwordForm.reset();
      },
      error: (err) => {
        this.errorMessage = err.error.message || 'Error changing password';
        this.successMessage = '';
      }
    });
  }
}
