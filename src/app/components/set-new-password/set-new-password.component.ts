import { CommonModule } from '@angular/common';
import { Component, type OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import  { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-set-new-password',
  imports: [CommonModule,FormsModule],
  templateUrl: './set-new-password.component.html',
  styleUrl: './set-new-password.component.css'
})
export class SetNewPasswordComponent  implements OnInit{

  newPasswordFocused: boolean = false;
  newPassword: string = '';
  confirmPasswordFocused: boolean = false;
  confirmPassword: string = '';
  errorMessage: string = '';
  successMessage: string = '';
  token = '';
  
  constructor( private http:HttpClient,private route: ActivatedRoute){}

  ngOnInit() {
    this.token = this.route.snapshot.queryParamMap.get('token') || '';
  }


  setNewPassword() {
    if (this.newPassword !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }
  
    this.http.post(`http://localhost:3000/auth/new-password`, {
      token: this.token,
      newPassword: this.newPassword
    }).subscribe({
      next: (res: any) => {
        this.successMessage = res.message;
        this.errorMessage = '';
      },
      error: (err) => {
        this.errorMessage = err.error.message || 'Something went wrong';
        this.successMessage = '';
      }
    });
  }
  

}
