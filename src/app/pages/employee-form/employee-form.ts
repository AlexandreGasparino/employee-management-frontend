import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // <-- Adicione
import { ActivatedRoute, Router } from '@angular/router';
import {
  CreateEmployeeRequest,
  Employee,
  EmployeeRole
} from '../../models/employee.model';
import { EmployeesService } from '../../services/employees.service';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-form.html',
  styleUrl: './employee-form.scss' 
})
export class EmployeeFormComponent implements OnInit {
  id: string | null = null;
  isEdit = false;
  loading = false;
  saving = false;
  error: string | null = null;

  EmployeeRole = EmployeeRole;
  roles = [
    { value: EmployeeRole.Employee, label: 'Employee' },
    { value: EmployeeRole.Leader, label: 'Leader' },
    { value: EmployeeRole.Director, label: 'Director' }
  ];

  form: any = {
    firstName: '',
    lastName: '',
    email: '',
    docNumber: '',
    birthDate: '',
    password: '',
    role: EmployeeRole.Employee,
    managerId: null,
    phones: [
      { number: '', type: 'Mobile' }
    ]
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeesService: EmployeesService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.isEdit = !!this.id;

    if (this.isEdit && this.id) {
      this.loadEmployee(this.id);
    }
  }

  loadEmployee(id: string): void {
    this.loading = true;
    this.employeesService.getById(id).subscribe({
      next: (employee: Employee) => {
        this.loading = false;
        this.form.firstName = employee.firstName;
        this.form.lastName = employee.lastName;
        this.form.email = employee.email;
        this.form.docNumber = employee.docNumber;
        this.form.birthDate = employee.birthDate.substring(0, 10);
        this.form.role = employee.role;
        this.form.managerId = employee.managerId ?? null;
        this.form.phones = employee.phones.length > 0
          ? employee.phones.map(p => ({ number: p.number, type: p.type }))
          : [{ number: '', type: 'Mobile' }];
      },
      error: (err) => {
        this.loading = false;
        this.error = err.error?.message || 'Erro ao carregar funcionário';
      }
    });
  }

  addPhone(): void {
    this.form.phones.push({ number: '', type: 'Mobile' });
  }

  removePhone(index: number): void {
    if (this.form.phones.length > 1) {
      this.form.phones.splice(index, 1);
    }
  }

  submit(): void {
    this.error = null;
    this.saving = true;

    if (this.isEdit && this.id) {
      const request: Partial<CreateEmployeeRequest> = {
        firstName: this.form.firstName,
        lastName: this.form.lastName,
        email: this.form.email,
        birthDate: this.form.birthDate,
        role: this.form.role,
        managerId: this.form.managerId,
        phones: this.form.phones
      };

      this.employeesService.update(this.id, request).subscribe({
        next: () => {
          this.saving = false;
          this.router.navigate(['/employees']);
        },
        error: (err) => {
          this.saving = false;
          this.error = err.error?.message || 'Erro ao salvar funcionário';
        }
      });

    } else {
      const request: CreateEmployeeRequest = {
        firstName: this.form.firstName,
        lastName: this.form.lastName,
        email: this.form.email,
        docNumber: this.form.docNumber,
        birthDate: this.form.birthDate,
        password: this.form.password,
        role: this.form.role,
        managerId: this.form.managerId,
        phones: this.form.phones
      };

      this.employeesService.create(request).subscribe({
        next: () => {
          this.saving = false;
          this.router.navigate(['/employees']);
        },
        error: (err) => {
          this.saving = false;
          this.error = err.error?.message || 'Erro ao cadastrar funcionário';
        }
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/employees']);
  }
}