import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  errorMessage: string = '';

  constructor(private route: Router, private http: HttpClient) {}

  ngOnInit() {
    this.http
      .get<any>('http://localhost:5001/customers', {
        headers: new HttpHeaders({
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }),
      })
      .subscribe({
        next: (data) => {
          // store the token
          console.log(data);
        },
        error: (error) => {
          this.errorMessage = error.message || 'Login failed!';
        },
      });
  }

  onLogout() {
    localStorage.removeItem('token');
    this.route.navigate(['/login']);
  }

  onAddPressed() {
    this.route.navigate(['/add-customer']);
  }
}
