// src/app/uploadfile/uploadfile.component.ts
import { Component } from '@angular/core';
import { FileUploadModule } from 'primeng/fileupload';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-uploadfile',
  standalone: true,
  imports: [CommonModule, FileUploadModule],
  templateUrl: './Upload.component.html',
  styleUrls: ['./Upload.component.css']
})
export class UploadComponent {
//   onUpload(event: any) {
//     console.log('Upload complete; server returned:', event);
//     // optionally show a toast or navigate
//   }
  onUpload(event: any) {
  console.log("Upload Response:", event.originalEvent.body.files);
  alert("Uploaded and saved to DB!");

  this.onUpload= event.originalEvent.body.files; 
}
}

