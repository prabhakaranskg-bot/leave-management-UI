import { Component, OnInit } from '@angular/core';
import { User, UserService } from '../services/services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {
  users: User[] = [];
 
  user: User = { username: '', role: '' };
  newUser: User = { username: '', password: '', role: '' };

  editMode = false;
  creating = false;
  constructor(private userService: UserService) {}

  ngOnInit() { this.loadUsers(); }

  loadUsers() {
    this.userService.getAllUsers().subscribe(res => this.users = res);
  }

  // Edit
  startEdit(u: User) { this.user = { ...u }; this.editMode = true; }
  updateUser() {
    this.userService.updateUser(this.user.id!, this.user).subscribe(() => {
      this.editMode = false; this.loadUsers();
    });
  }
  cancelEdit() { this.editMode = false; }

  // Delete
  
  deleteUser(id: number) {
    if(confirm('Are you sure?')) this.userService.deleteUser(id).subscribe(() => this.loadUsers());
  }

  // Create
  startCreate() { this.newUser = { username: '', password: '', role: '' }; this.creating = true; }
  createUser() {
    if (!this.newUser.username || !this.newUser.password || !this.newUser.role) {
      alert('Fill all fields');
      return;
    }
  
    this.userService.createUser(this.newUser).subscribe({
      next: () => {
        this.creating = false;
        this.loadUsers();
      },
      error: err => {
        console.error(err);
        alert('Create failed');
      }
    });
  }
  cancelCreate() { this.creating = false; }
}
