import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHome, faUsers , faUpload } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../services/auth.service'; 
import { FileUploadModule } from 'primeng/fileupload';//added
import { HttpClient, HttpClientModule } from '@angular/common/http';//added
@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [CommonModule, RouterModule, FontAwesomeModule ,FileUploadModule]
})
export class DashboardComponent {
  faHome = faHome;
  faUsers = faUsers;
  faUpload = faUpload;
  constructor(private router: Router , private authService: AuthService , private http: HttpClient) {}

  logout() {
   this.authService.logout();
    this.router.navigateByUrl('/login');
  }
  
  onUpload(event: any) {
    console.log("Uploaded files:", event.files);
  }
}



// import { FileUploadModule } from 'primeng/fileupload';
// import { HttpClient, HttpClientModule } from '@angular/common/http';

// @Component({
//   selector: 'app-dashboard',
//   standalone: true,
//   imports: [FileUploadModule, HttpClientModule],
//   templateUrl: './dashboard.component.html',
//   styleUrls: ['./dashboard.component.css']
// })
// export class dashboardComponent {

//   constructor(private http: HttpClient) {}

//   onUpload(event: any) {
//     console.log("Uploaded files:", event.files);
//   }
// }
