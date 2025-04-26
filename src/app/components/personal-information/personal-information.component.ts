import { Component, OnInit } from '@angular/core';
import { Profile } from '../../models/profile.model';
import { UserService } from '../../services/profile/user.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-personal-information',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './personal-information.component.html',
  styleUrl: './personal-information.component.css'
})
export class PersonalInformationComponent implements OnInit {

  constructor(private userService: UserService) {}
  profileData: Profile = {
    _id: '',
    firstName: '',
    lastName: '',
    email: '',
    provider: '',
    isVerified: false,
    createdAt: '',
    verificationCode: '',
    verificationCodeExpiration: '',
    role: '',
    __v: undefined,
  };


  selectedFile: File | null = null;

  ngOnInit() {
    this.userService.getProfile().subscribe({
      next: (data: Profile) => {
        if (data) {
          this.profileData = {
            ...this.profileData,
            ...data
          };
        }
      },
      error: err => console.error('Error loading profile:', err)
    });
  }


  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }


  // onSubmit() {
  //   const profileData = { ...this.profileData };

  //   // if (this.selectedFile) {
  //   //   profileData.profileImage = this.selectedFile;
  //   // }

  //   this.userService.updateProfile(profileData).subscribe({
  //     next: res => {
  //       console.log('Profile updated successfully:', res);
  //       alert('Profile updated successfully!');
  //     },
  //     error: err => {
  //       console.error('Error updating profile:', err);
  //       alert('Failed to update profile.');
  //     }
  //   });
  // }

}
