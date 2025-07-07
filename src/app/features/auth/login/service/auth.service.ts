import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environment/environment';
import { firstValueFrom } from 'rxjs';
import { LoginRequestDTO } from '../models/login-request.dto';
import { ResultRequestDTO } from '../../../../shared/models/result-request.dto';
import { RegisterRequestDTO } from '../../../../shared/models/register-request.dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/Auth`;

  async login(username: string, password: string): Promise<void> {
    const request: LoginRequestDTO = { username, password };

    const response = await firstValueFrom(
      this.http.post<ResultRequestDTO<string>>(`${this.baseUrl}/AuthenticateAsync`, request)
    );

    if (response.isSuccess && response.value) {
      localStorage.setItem('token', response.value);
    } else {
      throw new Error(response.error || 'Login fallido');
    }
  }

  registerStudentAsync(request: RegisterRequestDTO) {
    return this.http.post<ResultRequestDTO<string>>(`${this.baseUrl}/RegisterStudentAsync`, request);
  }

  getCurrentUserRole(): string {
    const token = localStorage.getItem('token');
    if (!token) return '';
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.role || '';
    } catch {
      return '';
    }
  }

  getCurrentUsername(): string {
    const token = localStorage.getItem('token');
    if (!token) return '';
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.unique_name || '';
    } catch {
      return '';
    }
  }
}
