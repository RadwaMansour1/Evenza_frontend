
import { Component,  OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule, NgClass } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-select-role',
  templateUrl: './select-role.component.html',
  styleUrls: ['./select-role.component.css'],
  imports: [NgClass,CommonModule],
})
export class SelectRoleComponent implements OnInit {
  selectedRole: string | null = null;
  email: string = '';
  errorMessage: string = ''; 
  constructor(private http: HttpClient, private route: ActivatedRoute,private router: Router) {}
  ngOnInit(): void {

    this.route.queryParams.subscribe((params) => {
      console.log('Query params:', params['email']);
      this.email = params['email'] || '';
    });
  }

  // Check if the user has already selected a role
  selectRole(role: string) {
    console.log('Selected role:', role);
    this.selectedRole = role;    
    this.errorMessage = ''; 

  }

  continueWithRole() {
    const email = this.email;
    console.log('Selected Role on submit:', this.selectedRole);


    if (!this.selectedRole || !email) {
      console.log('No role or email provided');
      this.errorMessage = 'Please select a role first.';
      return;
    }
  

    this.http.patch('http://localhost:3000/auth/set-role',
      { email: email, role: this.selectedRole }

    ).subscribe(
      response => {
        console.log('Role updated successfully:', response);
        this.router.navigate(['/profile']);
      },
      error => {
        console.error('Error updating role:', error);
      }
    );
  }
  
}
