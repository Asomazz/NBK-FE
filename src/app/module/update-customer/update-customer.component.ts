import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; // Import for routing
import { Customer, Gender } from './customer.model'; // Import Customer and Gender
import { FormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';

import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';

@Component({
  selector: 'app-update-customer',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './update-customer.component.html',
  styleUrl: './update-customer.component.css',
  providers: [DatePipe], // Provide DatePipe here
})
export class UpdateCustomerComponent implements OnInit {
  customerId: number = 0; // Store retrieved customer ID
  existingCustomer: Customer = new Customer();
  genders = Object.keys(Gender).map((key) => Gender[key as Gender]);
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    this.customerId = Number(this.route.snapshot.paramMap.get('id')); // Get ID from URL
    // Assuming you have a service to get customer data by ID
    this.getCustomerById(this.customerId); // Call service to fetch customer data
  }

  getCustomerById(id: number) {
    this.http
      .get<any>(`http://localhost:5001/customers/${id}`, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }),
      })
      .subscribe({
        next: (data) => {
          // store the token
          this.existingCustomer = data.Customer;
        },
        error: (error) => {
          this.errorMessage =
            error.message || 'Getting customer with this ID failed!';
        },
      });

    // Replace with your actual service call to retrieve customer data by ID
    // This is a placeholder for demonstration purposes
    // this.existingCustomer = {
    //   id: ,
    //   name: 'John Doe',
    //   number: '123-456-7890',
    //   dob: new Date('1990-01-01'),
    //   gender: Gender.Male
    // };
  }

  onSubmit() {
    // Handle form submission logic here
    console.log('Updated customer:', this.existingCustomer);
    this.existingCustomer.dateOfBirth = this.formattedDob;
    this.http
      .put<any>(
        `http://localhost:5001/customers/${this.customerId}`,
        this.existingCustomer,
        {
          headers: new HttpHeaders({
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          }),
        }
      )
      .subscribe({
        next: (data) => {
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          this.errorMessage = error.message || 'Updated failed!';
        },
      });
  }

  get formattedDob(): any {
    return this.existingCustomer.dateOfBirth
      ? this.datePipe.transform(this.existingCustomer.dateOfBirth, 'YYYY/MM/dd')
      : '';
  }

  onCancel() {
    this.router.navigate(['/dashboard']);
  }
}
