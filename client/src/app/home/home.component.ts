import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StepperModule } from 'primeng/stepper';
import { ButtonModule } from 'primeng/button';
import { TabsModule } from 'primeng/tabs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
   imports: [
  StepperModule,
   ButtonModule,TabsModule 
  ]
})
export class HomeComponent implements OnInit {
  user: any=null;
  totalUsers = 0;
  activeUsers = 0;
  inactiveUsers = 0;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Get logged in user from localStorage
    this.user = JSON.parse(localStorage.getItem('user') || '{}');

    // Fetch users stats from API
    this.http.get<any>('http://localhost:3000/api/users/getAllUsers').subscribe(
      res => {
        if (res.status === 200) {
          this.totalUsers = res.results.length;
          this.activeUsers = res.results.filter((u: any) => u.status === 0).length;
          this.inactiveUsers = res.results.filter((u: any) => u.status === 1).length;
        }
      },
      err => console.error(err)
    );
  }
}
