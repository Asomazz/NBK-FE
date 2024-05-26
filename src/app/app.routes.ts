import { Routes } from '@angular/router';
import { LoginComponent } from './module/login/login.component';
import { DashboardComponent } from './module/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard } from './guards/not.auth.guard';
import { AddNewCustomerComponent } from './module/add-new-customer/add-new-customer.component';
import { UpdateCustomerComponent } from './module/update-customer/update-customer.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [NotAuthGuard] },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'add-customer',
    component: AddNewCustomerComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'update-customer/:id',
    component: UpdateCustomerComponent,
    canActivate: [AuthGuard],
  },
];
