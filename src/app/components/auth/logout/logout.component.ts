import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { featherAlertCircle, featherLogOut, featherShield } from '@ng-icons/feather-icons';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-logout',
  imports: [NgIcon],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css',
  viewProviders:[provideIcons({featherShield,featherAlertCircle,featherLogOut})]
})
export class LogoutComponent {

  constructor(private router: Router, private authService: AuthService){

  }
  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
