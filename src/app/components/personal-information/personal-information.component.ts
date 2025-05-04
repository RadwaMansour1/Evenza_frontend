import { Component, inject, Input, OnInit, signal } from '@angular/core';
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
import { TranslateModule,  TranslateService } from '@ngx-translate/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { featherFacebook, featherGlobe, featherInstagram, featherLinkedin, featherTwitter, featherUpload } from '@ng-icons/feather-icons';

@Component({
  selector: 'app-personal-information',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,  
    CustomAlertComponent,
    TranslateModule,
    NgIcon,
  ],
  templateUrl: './personal-information.component.html',
  styleUrl: './personal-information.component.css',
  viewProviders:[provideIcons({featherUpload,featherFacebook,featherInstagram,featherTwitter,featherLinkedin,featherGlobe})]
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
  // new edit
  @Input() user!: { id: string; name: string; email: string };
  editing = signal(false);
  direction: 'rtl' | 'ltr' = 'ltr';


  constructor(private fb: FormBuilder, private userService: UserService,
  ) {
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
      streetAddress: [''],
      city: [''],
      state: [''],
      postalCode: [''],
      photo: [null],
      facebook: [''],
      instagram: [''],
      twitter:[''],
      linkedin: [''],
      website: [''],

    });

  }

  countries = [
    { value: 'cairo', label: 'auth.accountInfo.cairo' },
    { value: 'alex', label: 'auth.accountInfo.alex' },
    { value: 'giza', label: 'auth.accountInfo.giza' },
    { value: 'aswan', label: 'auth.accountInfo.aswan' },
    { value: 'luxor', label: 'auth.accountInfo.luxor' },
    { value: 'beniSuef', label: 'auth.accountInfo.beniSuef' },
    { value: 'fayoum', label: 'auth.accountInfo.fayoum' },
    { value: 'sharqia', label: 'auth.accountInfo.sharqia' },
    { value: 'gharbia', label: 'auth.accountInfo.gharbia' },
    { value: 'dakahliya', label: 'auth.accountInfo.dakahliya' },
    { value: 'kafrElSheikh', label: 'auth.accountInfo.kafrElSheikh' },
    { value: 'menoufia', label: 'auth.accountInfo.menoufia' },
    { value: 'minya', label: 'auth.accountInfo.minya' },
    { value: 'sohag', label: 'auth.accountInfo.sohag' },
    { value: 'qena', label: 'auth.accountInfo.qena' },
    { value: 'redSea', label: 'auth.accountInfo.redSea' },
    { value: 'northSinai', label: 'auth.accountInfo.northSinai' },
    { value: 'southSinai', label: 'auth.accountInfo.southSinai' },
    { value: 'matrouh', label: 'auth.accountInfo.matrouh' },
    { value: 'newValley', label: 'auth.accountInfo.newValley' },
    { value: 'portSaid', label: 'auth.accountInfo.portSaid' },
    { value: 'ismailia', label: 'auth.accountInfo.ismailia' },
    { value: 'suez', label: 'auth.accountInfo.suez' },
    { value: 'damietta', label: 'auth.accountInfo.damietta' }
  ];
  

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
            streetAddress: data.streetAddress || '',
            city: data.city || '',
            state: data.state || '',
            postalCode: data.postalCode || '',
            facebook: data.facebook || '',
            instagram: data.instagram || '',
            linkedin: data.linkedin || '',
            twitter: data.twitter || '',
            website: data.website || ''
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
  //new edit
    get profileImageUrl(): string {
      const firstName = this.profileForm?.value?.firstName || '';
      const lastName = this.profileForm?.value?.lastName || '';
      const fullName = `${firstName} ${lastName}`.trim();
      const encodedName = encodeURIComponent(fullName);
      return `https://api.dicebear.com/7.x/initials/svg?seed=${encodedName}`;
    }

  //new edit
  toggleEdit() {
    this.editing.update((val) => !val);
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
          this.editing.set(false);
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
