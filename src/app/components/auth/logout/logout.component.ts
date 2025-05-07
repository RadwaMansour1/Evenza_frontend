import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { featherAlertCircle, featherClock, featherLogOut, featherShield } from '@ng-icons/feather-icons';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { TranslateModule } from '@ngx-translate/core';
import { NgxSpinnerService, NgxSpinnerModule } from 'ngx-spinner';


@Component({
  selector: 'app-logout',
  imports: [NgIcon,TranslateModule,NgxSpinnerModule,RouterLink],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css',
  viewProviders:[provideIcons({featherShield,featherAlertCircle,featherLogOut,featherClock})]
})
export class LogoutComponent {

  constructor(private router: Router, private authService: AuthService,private spinner: NgxSpinnerService){

  }
  
  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
