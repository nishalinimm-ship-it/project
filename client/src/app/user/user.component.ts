import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';

@Component({
  selector: 'app-user',
  standalone: true,
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  imports: [
    CommonModule,
    DialogModule,
    TableModule,
    ButtonModule,
    FormsModule,
    InputTextModule,
    PaginatorModule
  ]
})
export class UserComponent implements OnInit {

  users: any[] = [];
  loading = false;

  rows = 10;
  totalRecords = 0;

  displayUserDialog = false;
  isEditMode = false;

  userFormData = {
    id: null,
    user_name: '',
    email: '',
    password: ''
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadUsers({ first: 0, rows: this.rows });
  }

  loadUsers(event: any) {
    this.loading = true;

    const page = event.first / event.rows;
    const limit = event.rows;

    this.http.get<any>(
      `http://localhost:3000/api/users/getUsers?page=${page}&limit=${limit}`
    ).subscribe(
      res => {
        this.users = res.results;
        this.totalRecords = res.total;
        this.loading = false;
      },
      () => {
        this.loading = false;
      }
    );
  }

  fetchUsers() {
    this.loadUsers({ first: 0, rows: this.rows });
  }

  openCreateDialog() {
    this.isEditMode = false;
    this.userFormData = {
      id: null,
      user_name: '',
      email: '',
      password: ''
    };
    this.displayUserDialog = true;
  }

  openEditDialog(user: any) {
    this.isEditMode = true;

    this.userFormData = {
      id: user.user_id,
      user_name: user.user_name,
      email: user.email,
      password: ''
    };

    this.displayUserDialog = true;
  }

  saveUser() {
    if (this.isEditMode) {
      this.http.put<any>(
        `http://localhost:3000/api/users/updateUser/${this.userFormData.id}`,
        this.userFormData
      ).subscribe(
        res => {
          alert('User updated successfully');
          this.displayUserDialog = false;
          this.fetchUsers();
        }
      );

    } else {
      this.http.post<any>(
        'http://localhost:3000/api/users/addUser',
        this.userFormData
      ).subscribe(
        res => {
          alert('User created successfully');
          this.displayUserDialog = false;
          this.fetchUsers();
        }
      );
    }
  }

  deleteUser(id: number) {
    if (!confirm('Are you sure you want to delete this user?')) return;

    this.http.delete<any>(
      `http://localhost:3000/api/users/deleteUser/${id}`
    ).subscribe(
      res => {
        alert('User deleted successfully');
        this.fetchUsers();
      }
    );
  }

}
