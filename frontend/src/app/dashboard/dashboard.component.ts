import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../services/user.service';
import { ActivationModalComponent } from '../components/activation-modal/activation-modal.component';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, ActivationModalComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  userName: string = '';
  loading: boolean = true;
  error: string = '';
  showModal: boolean = false;
  isActivated: boolean = false;

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

  openModal(): void {
    console.log('Opening activation modal');
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.isActivated = true;
  }
}
