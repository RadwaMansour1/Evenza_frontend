import { Component, inject, OnInit } from '@angular/core';
import { Profile } from '../../models/profile.model';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
  FormGroup,
} from '@angular/forms';
import { UserService } from '../../services/profile/user.service';
import { CommonModule } from '@angular/common';
import { CONSTANTS } from '../../constants';
import { CustomAlertComponent } from '../shared/custom-alert/custom-alert.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-personal-information',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    CustomAlertComponent,
    TranslateModule
  ],
  templateUrl: './personal-information.component.html',
  styleUrl: './personal-information.component.css',
})
export class PersonalInformationComponent implements OnInit {
  profileForm: FormGroup;
  selectedImagePreview: string | ArrayBuffer | null = null;
  userId: any = '';
  selectedFile: File | null = null;
  // alert
  showAlert: boolean = false;
  alertType: 'success' | 'error' | 'warning' | 'info' = 'success';
  alertMessage: string = 'profile data updated successfully';

  constructor(private fb: FormBuilder, private userService: UserService) {
    console.log('user id', this.userId);
    const userDataString = localStorage.getItem(CONSTANTS.userData);
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
      address: [''],
      city: [''],
      state: [''],
      postalCode: [''],
      photo: [null],
    });
  }

  ngOnInit() {
    this.userService.getProfile().subscribe({
      next: (res: any) => {
        console.log('data', res.data);
        const data = res.data;

        if (data) {
          this.profileForm.patchValue({
            firstName: data.firstName || '',
            lastName: data.lastName || '',
            phone1: data.phone1 || '',
            phone2: data.phone2 || '',
            email: data.email || '',
            country: data.country || '',
            gender: data.gender || '',
            address: data.address || '',
            city: data.city || '',
            state: data.state || '',
            postalCode: data.postalCode || '',
          });
          this.selectedImagePreview = data.photo;
        }
      },
      error: (err) => {
        this.alertMessage = 'Ops,there is a problem ,please try again later!';
        this.alertType = 'error';
        this.showAlert = true;
      },
    });
  }
  onFileSelected(event: any) {
    const file =
      event.target.files && event.target.files.length > 0
        ? event.target.files[0]
        : null;

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

  onSubmit() {
    if (this.profileForm.valid) {
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

      // for (const [key, value] of formData.entries()) {
      //   console.log('Adding to formData:', key, value);
      //   console.log(key, value);
      // }

      this.userService.updateProfile(formData).subscribe({
        next: (response) => {
          // console.log('Profile updated successfully', response);
          this.alertMessage = 'Profile updated successfully';
          this.alertType = 'success';
          this.showAlert = true;
        },
        error: (error) => {
          this.alertMessage = 'Ops,there is a problem ,please try again later!';
          this.alertType = 'error';
          this.showAlert = true;
        },
      });
    } else {
      console.log('Form Not Valid');
    }
  }
}
