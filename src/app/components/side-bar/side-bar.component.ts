import { Component } from '@angular/core';
import { RouterModule,  Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-side-bar',
  imports: [RouterModule],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent {
  constructor(private router: Router, private authService:AuthService) {}
  signOut() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
