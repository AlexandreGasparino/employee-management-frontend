import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {
  CreateEmployeeRequest,
  Employee
} from '../models/employee.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor(private http: HttpClient) {}

  getAll(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${environment.apiUrl}/api/employees`);
  }

  getById(id: string): Observable<Employee> {
    return this.http.get<Employee>(`${environment.apiUrl}/api/employees/${id}`);
  }

  create(request: CreateEmployeeRequest): Observable<Employee> {
    return this.http.post<Employee>(`${environment.apiUrl}/api/employees`, request);
  }

  update(id: string, request: Partial<CreateEmployeeRequest>): Observable<Employee> {
    return this.http.put<Employee>(`${environment.apiUrl}/api/employees/${id}`, request);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/api/employees/${id}`);
  }
}