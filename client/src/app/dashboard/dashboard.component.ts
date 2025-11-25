import { Component } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHome, faUsers, faUpload } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../services/auth.service';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    FileUploadModule,
    ButtonModule
  ]
})
export class DashboardComponent {

  faHome = faHome;
  faUsers = faUsers;
  faUpload = faUpload;

  // Controls company submenu
  companyMenuActive = false;

  constructor(private router: Router, private authService: AuthService) {
    // Detect current route and auto-open submenu if needed
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.companyMenuActive =
          this.router.url.includes('/dashboard/company') ||
          this.router.url.includes('/dashboard/company-list') ||
          this.router.url.includes('/dashboard/company-users');
      }
    });
  }

  onUpload(event: any) {
    console.log("Upload completed!", event);
  }

  onUploadError(event: any) {
    console.error("Upload failed", event);
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
