import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './service/auth.service';
import { NotificationService } from '../../../shared/services/notification.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);
  private notification = inject(NotificationService);

  form = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  loading = false;

  async login() {
    if (this.form.invalid) return;

    this.loading = true;
    try 
    {
      const { username, password } = this.form.value;
      await this.authService.login(username!, password!);
      this.router.navigate(['/dashboard']);
    } 
    catch (error) 
    {
      this.notification.error('Usuario o contraseña incorrectos.');
    } 
    finally 
    {
      this.loading = false;
    }
  }
}
