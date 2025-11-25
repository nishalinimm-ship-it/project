import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-company-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent {
  companies: any[] = [];

  constructor(
    private companyService: CompanyService,
    private router: Router
  ) {}

  ngOnInit() {
    this.companyService.getCompanies().subscribe((res: any) => {
      this.companies = res.results;
    });
  }

  openUsers(company: any) {
    this.router.navigate(['/dashboard/company-users', company.company_id]);
  }
}
