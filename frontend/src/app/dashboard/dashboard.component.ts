import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  userName: string = '';
  loading: boolean = true;
  error: string = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.fetchUserData();
  }

  fetchUserData(): void {
    this.userService.getUser().subscribe(
      (data) => {
        this.userName = data.name || 'User Name';
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching user data:', error);
        this.error = 'Failed to load user data';
        this.loading = false;
      },
    );
  }
}
