import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  heroIdentification,
  heroShieldCheck,
  heroArrowUpTray,
} from '@ng-icons/heroicons/outline';
import { featherUploadCloud } from '@ng-icons/feather-icons';
import { UploadDocService } from '../../../services/organizer/upload-doc.service';

@Component({
  selector: 'app-id-verification',
  imports: [CommonModule, NgIcon],
  templateUrl: './id-verification.component.html',
  providers: [
    provideIcons({
      heroIdentification,
      heroShieldCheck,
      heroArrowUpTray,
      featherUploadCloud,
    }),
  ],
})
export class IdVerificationComponent {
  selectedImagePreview: string | ArrayBuffer | null = null;
  selectedImageFile: File | null = null;

  constructor(private uploadDocService: UploadDocService) {}

  onFileSelected(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;

    if (fileList && fileList[0]) {
      const file = fileList[0];
      this.selectedImageFile = file;
      const reader = new FileReader();
      reader.onload = (e) => (this.selectedImagePreview = reader.result);
      reader.readAsDataURL(file);
    } else {
      this.selectedImagePreview = null;
      this.selectedImageFile = null;
    }
  }

  cancel(): void {
    // console.log('Cancel clicked');
    this.selectedImagePreview = null;
    this.selectedImageFile = null;
  }

  uploadDocument(): void {
    this.uploadDocService.uploadNationalId(this.selectedImageFile).subscribe({
      next: (res: any) => {
        console.log(res);
        this.selectedImagePreview = null;
        this.selectedImageFile = null;
      },
      error: (err: any) => {
        console.error('Error uploading document:', err);
      },
    });
  }
}
