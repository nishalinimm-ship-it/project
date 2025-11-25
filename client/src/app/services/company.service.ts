import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private baseUrl = 'http://localhost:3000/api/company';

  constructor(private http: HttpClient) {}

  getCompanies() {
    return this.http.get(`${this.baseUrl}/All`);
  }

  getUsersByCompany(id: number) {
    return this.http.get(`${this.baseUrl}/users/${id}`);
  }
}
