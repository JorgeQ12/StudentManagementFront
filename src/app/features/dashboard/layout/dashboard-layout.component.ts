import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardComponent } from '../admin-dashboard/admin-dashboard.component';
import { AuthService } from '../../auth/login/service/auth.service';
import { StudentDashboardComponent } from "../student-dashboard/student-dashboard.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [CommonModule, AdminDashboardComponent, StudentDashboardComponent],
  templateUrl: './dashboard-layout.component.html',
})
export class DashboardLayoutComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  readonly role = computed(() => this.authService.getCurrentUserRole());
  readonly username = computed(() => this.authService.getCurrentUsername());

  logout(): void {
    localStorage.clear(),
    this.router.navigate(['/auth/login']);
  }
}
