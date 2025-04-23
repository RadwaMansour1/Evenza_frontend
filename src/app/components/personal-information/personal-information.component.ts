import { Component } from '@angular/core';
import { Profile } from '../../models/profile.model';
import { UserService } from '../../services/profile/user.service';

@Component({
  selector: 'app-personal-information',
  imports: [],
  templateUrl: './personal-information.component.html',
  styleUrl: './personal-information.component.css'
})
export class PersonalInformationComponent {

  constructor(private userService: UserService) {}
  profileData: Profile = {
    firstName: '',
    lastName: '',
    phone1: '',
    phone2: '',
    gender: '',
    country: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    dateOfBirth: '',
  };
  
  selectedFile: File | null = null;
  
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }
  
  onSubmit() {
    this.profileData.profileImage = this.selectedFile!;
    this.userService.updateProfile(this.profileData).subscribe({
      next: () => alert("Profile updated successfully!"),
      error: (err) => console.error(err),
    });
  }
}
