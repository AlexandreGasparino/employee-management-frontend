import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoginRequest } from '../../models/auth.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss' 
})
export class LoginComponent {
  form: LoginRequest = { email: '', password: '' };
  loading = false;
  error: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  submit(): void {
    this.error = null;
    this.loading = true;

    this.authService.login(this.form).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/employees']);
      },
      error: (err) => {
        this.loading = false;
        this.error = err.error?.message || 'Erro ao autenticar';
      }
    });
  }
}