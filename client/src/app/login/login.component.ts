import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, FormsModule, CardModule, InputTextModule, ButtonModule, HttpClientModule]
})
export class LoginComponent {
  loading = false;
  username = '';
  password = '';

  constructor(private router: Router, private http: HttpClient, private authService: AuthService) {}

    ngOnInit() {
    // Redirect if already logged in
    if (this.authService.getLoginStatus()) {
      this.router.navigateByUrl('/dashboard/home');
    }
  }
  onSubmit() {
    if (!this.username || !this.password) {
      alert("Please enter username and password");
      return;
    }

    this.loading = true;

    this.http.post<any>("http://localhost:3001/api/login", { username: this.username, password: this.password })
      .subscribe({
        next: (res) => {
          this.loading = false;
          console.log("Login response:", res);
          if (res.status === 200) {
          this.authService.setLoginStatus(true)
            localStorage.setItem('user', JSON.stringify(res.results));
                console.log("Navigating to dashboard/home");
            this.router.navigateByUrl("/dashboard/home").then (success=>{
                console.log("Navigation success:", success);
        }).catch(err => {
          console.error("Navigation error:", err);
        });

            
            
          } else {
            alert(res.reason || "User not found");
          }
        },
        error: (err) => {
          this.loading = false;
          alert(err.error?.reason || "Login failed");
        }
      });
  }
}
