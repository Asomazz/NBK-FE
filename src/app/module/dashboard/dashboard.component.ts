import { CommonModule } from '@angular/common';
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
  imports: [HttpClientModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  customers: any = [];
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
          this.customers = data;
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
  onUpdateClick(id: any) {
    this.route.navigate([`/update-customer/${id}`]);
  }
}
