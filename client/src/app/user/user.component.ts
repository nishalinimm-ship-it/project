import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

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
    InputTextModule
  ]
})
export class UserComponent implements OnInit {

  users: any[] = [];
  loading = false;

  // One dialog for add + edit
  displayUserDialog = false;

  // Track mode
  isEditMode = false;

  // Form data
  userFormData = {
    id: null,
    name: '',
    email: '',
    password: ''
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  // ===============================
  // GET ALL USERS
  // ===============================
  fetchUsers() {
    this.loading = true;

    this.http.get<any>('http://localhost:3001/api/getAllUsers').subscribe(
      res => {
        this.loading = false;
        if (res.status === 200) {
          this.users = res.results;
        } else {
          alert(res.reason);
        }
      },
      () => {
        this.loading = false;
        alert('Error fetching users');
      }
    );
  }

  // ===============================
  // OPEN CREATE DIALOG
  // ===============================
  openCreateDialog() {
    this.isEditMode = false;
    this.userFormData = { id: null, name: '', email: '', password: '' };
    this.displayUserDialog = true;
  }

  // ===============================
  // OPEN EDIT DIALOG
  // ===============================
  openEditDialog(user: any) {
    this.isEditMode = true;
    this.userFormData = { ...user }; // clone
    this.displayUserDialog = true;
  }

  // ===============================
  // SAVE USER (CREATE + UPDATE)
  // ===============================
  saveUser() {
    if (this.isEditMode) {
      // UPDATE USER
      this.http.put<any>(
        `http://localhost:3001/api/updateUser/${this.userFormData.id}`,
        this.userFormData
      ).subscribe(
        res => {
          if (res.status === 200) {
            alert('User updated successfully');
            this.displayUserDialog = false;
            this.fetchUsers();
          } else {
            alert(res.reason);
          }
        }
      );

    } else {
      // CREATE USER
      this.http.post<any>('http://localhost:3001/api/addUser', this.userFormData)
        .subscribe(
          res => {
            if (res.status === 201) {
              alert('User created successfully');
              this.displayUserDialog = false;
              this.fetchUsers();
            } else {
              alert(res.reason);
            }
          }
        );
    }
  }

  // ===============================
  // DELETE USER
  // ===============================
  deleteUser(id: number) {
    if (!confirm('Are you sure you want to delete this user?')) return;

    this.http.delete<any>(`http://localhost:3001/api/deleteUser/${id}`).subscribe(
      res => {
        if (res.status === 200) {
          alert('User deleted successfully');
          this.fetchUsers();
        } else {
          alert(res.reason);
        }
      },
      () => {
        alert('Error deleting user');
      }
    );
  }

}
