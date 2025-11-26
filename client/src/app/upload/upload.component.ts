// src/app/uploadfile/uploadfile.component.ts
import { Component } from '@angular/core';
import { FileUploadModule } from 'primeng/fileupload';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-uploadfile',
  standalone: true,
  imports: [CommonModule, FileUploadModule],
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent {
    uploadedFiles: any[] = []; // store uploaded files
    onUpload(event: any) {
    console.log('Upload complete; server returned:', event);
    if (event?.originalEvent?.body?.files) {
      this.uploadedFiles = event.originalEvent.body.files;
      console.log('Uploaded files:', this.uploadedFiles);
    }
    alert("Uploaded and saved to DB!");
  }
}

