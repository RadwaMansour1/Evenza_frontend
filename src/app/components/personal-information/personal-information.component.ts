
import { Component, inject,  OnInit } from '@angular/core';
import { Profile } from '../../models/profile.model';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators,  FormGroup } from '@angular/forms';
import { heroCalendar, heroUser } from '@ng-icons/heroicons/outline';
import { eventNames } from 'process';
import { UserService } from '../../services/profile/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-personal-information',
  imports: [ReactiveFormsModule,CommonModule,FormsModule],
  templateUrl: './personal-information.component.html',
  styleUrl: './personal-information.component.css'
})
export class PersonalInformationComponent implements OnInit {
  profileForm:FormGroup;
  selectedImagePreview: string | ArrayBuffer | null = null;
  userId:any = ''
  selectedFile: File | null = null;
  

  constructor( private fb: FormBuilder, private userService : UserService) {
    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      this.userId = userData.id;
    }

    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone1: ['', Validators.required],
      phone2: [''],
      email: ['', [Validators.required, Validators.email]],
      country: ['', Validators.required],
      gender: ['', Validators.required],
      streetAddress: [''],
      city: [''],
      state: [''],
      postalCode: [''],
      photo: [null], 
    });
  }
  ngOnInit() {
    this.userService.getProfile().subscribe({
      next: (data: any) => {
        if (data) {
          this.profileForm = {
            ...this.profileForm,
            ...data
          };
        }
      },
      error: err => console.error('Error loading profile:', err)
    });
  }

  //  ngOnInit() {
  //   this.loadUserProfile();
  // }

  // loadUserProfile() {
  //   this.profileService.getProfile(this.userId).subscribe({
  //     next: (profile) => {
  //       console.log('Profile loaded', profile);

  //       // Fill the form with received data
  //       this.profileForm.patchValue({
  //         firstName: profile.firstName || '',
  //         lastName: profile.lastName || '',
  //         phone1: profile.phone1 || '',
  //         phone2: profile.phone2 || '',
  //         email: profile.email || '',
  //         country: profile.country || '',
  //         gender: profile.gender || '',
  //         streetAddress: profile.address || '',
  //         city: profile.city || '',
  //         state: profile.state || '',
  //         postalCode: profile.zipCode || '',
  //         // Note: photo مش هتتعمل Patch, بتتعرض في preview لو محتاج تعرض الصورة القديمة
  //       });
  //     }
  //   });
  // }
  onFileSelected(event: any){
    
    const file = event.target.files && event.target.files.length > 0 ? event.target.files[0] : null;

    if (file) {
      this.profileForm.patchValue({ photo: file });
  
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    } else {
      this.profileForm.patchValue({ photo: null });
      this.selectedImagePreview = null;
    }

  }

  onSubmit(){
    if(this.profileForm.valid){
      const formData = new FormData(); 
      Object.entries(this.profileForm.value).forEach(([key, value]) => {
        if (key === 'photo') {
          if (value instanceof File) {
            formData.append('photo', value);
          }
        } else {
          formData.append(key, value as any);
        }
      });

      
      for (const [key, value] of formData.entries()) {
        console.log('Adding to formData:', key, value);
        console.log(key, value);
      }
      

      // this.userService.updateProfile(formData).subscribe({
      //   next:(response) =>{
      //     console.log('Profile updated successfully', response);
      //     this.profileForm.reset();
      //   },
      //   error: (error) => {
      //     console.error('Error updating profile', error);
      //   }
      // });

      console.log('Form Data ready to be sent:', formData);
      } else {
        console.log('Form Not Valid');
      }
    }
  }










  // constructor(private userService: UserService) {}
  // profileData: Profile = {
  //   _id: '',
  //   firstName: '',
  //   lastName: '',
  //   email: '',
  //   provider: '',
  //   isVerified: false,
  //   createdAt: '',
  //   verificationCode: '',
  //   verificationCodeExpiration: '',
  //   role: '',
  //   __v: undefined,
  // };




  


  // onFileSelected(event: any) {
  //   this.selectedFile = event.target.files[0];
  // }


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
