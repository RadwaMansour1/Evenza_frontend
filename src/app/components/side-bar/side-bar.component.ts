import { Component } from '@angular/core';
import { RouterModule,  Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { CONSTANTS } from '../../constants';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-side-bar',
  imports: [RouterModule],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent {
  constructor(private router: Router, private authService:AuthService) {}
  signOut() {
    console.log('Sign out clicked');
    // this.authService.logout();
  
    localStorage.removeItem(CONSTANTS.token);
    localStorage.removeItem('userData');
    sessionStorage.removeItem(CONSTANTS.token);
    sessionStorage.removeItem('userData');
    this.router.navigate(['/login']);
      
}
}
