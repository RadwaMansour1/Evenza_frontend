import { Component } from '@angular/core';
import { SideBarComponent } from "../side-bar/side-bar.component";
import { PersonalInformationComponent } from "../personal-information/personal-information.component";
import { HelpCenterComponent } from "../help-center/help-center.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [RouterOutlet, SideBarComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

}
