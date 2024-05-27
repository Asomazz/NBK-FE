import { Component, OnInit } from '@angular/core';
import { Customer, Gender } from './customer.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-new-customer',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './add-new-customer.component.html',
  styleUrl: './add-new-customer.component.css',
})
export class AddNewCustomerComponent {
  newCustomer: Customer = new Customer();
  genders = Object.keys(Gender).map((key) => Gender[key as Gender]);
  errorMessage: string = '';

  constructor(private http: HttpClient, private route: Router) {}

  onSubmit() {
    this.http
      .post<any>('http://localhost:5001/customers', this.newCustomer, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }),
      })
      .subscribe({
        next: (data) => {
          this.route.navigate(['/dashboard']);
        },
        error: (error) => {
          this.errorMessage = error.message || 'Login failed!';
        },
      });
  }
  onCancel() {
    this.route.navigate(['/dashboard']);
  }
}
