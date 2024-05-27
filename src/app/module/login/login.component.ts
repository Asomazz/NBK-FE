import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient, private route: Router) {}

  onSubmit(loginForm: any) {
    console.log('Form submitted:', loginForm.value);

    this.http
      .post<any>('http://localhost:5001/auth/login', loginForm.value)
      .subscribe({
        next: (data) => {
          localStorage.setItem('token', data.token);
          this.route.navigate(['/dashboard']);
        },
        error: (error) => {
          this.errorMessage = error.message || 'Login failed!';
        },
      });
  }
}
