import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-company-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './company-users.component.html',
  styleUrls: ['./company-users.component.css']
})
export class CompanyUsersComponent {

  users: any[] = [];
  companyId!: number;

  constructor(
    private route: ActivatedRoute,
    private companyService: CompanyService
  ) {}

  ngOnInit() {
    this.companyId = Number(this.route.snapshot.paramMap.get('id'));

    this.companyService.getUsersByCompany(this.companyId)
      .subscribe((res: any) => {
        this.users = res.results;
      });
  }
}
