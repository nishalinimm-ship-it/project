import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHome, faUsers } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../services/auth.service'; 

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [CommonModule, RouterModule, FontAwesomeModule ]
})
export class DashboardComponent {
  faHome = faHome;
  faUsers = faUsers;
  constructor(private router: Router , private authService: AuthService) {}

  logout() {
   this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
