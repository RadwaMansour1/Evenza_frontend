import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/admin/auth.service'; // Adjust path if needed
import { Router } from '@angular/router';
import { CONSTANTS } from '../../../constants'; // Adjust path if needed
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-login',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './admin-login.component.html',
})
export class AdminLoginComponent {
  loginForm: FormGroup;
  loginError: string = '';
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    // Initialize form with validation rules
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  // Submit handler for login form
 onSubmit(): void {
  if (this.loginForm.valid) {
    this.isLoading = true;
    this.loginError = '';
    const { email, password } = this.loginForm.value;
    
    this.authService.login(email, password).subscribe({
      next: () => {
        // Navigation happens only after storage is confirmed
        console.log('Login successful, navigating...');
        this.router.navigate(['/admin/analytics'])
          .then(() => {
            console.log('Navigation completed');
            this.isLoading = false;
          })
          .catch(err => {
            console.error('Navigation error:', err);
            this.isLoading = false;
          });
      },
      error: (err) => {
        console.error('Login error:', err);
        this.loginError = err.error?.message || err.message || 'Login failed';
        this.isLoading = false;
      }
    });
  }
}

  // Check if there is an existing token and redirect user
  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/admin/analytics']);
    }
  }
}