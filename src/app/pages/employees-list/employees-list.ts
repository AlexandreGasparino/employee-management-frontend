import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { EmployeesService } from '../../services/employees.service';
import { Employee, EmployeeRole } from '../../models/employee.model';

@Component({
  selector: 'app-employees-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employees-list.html',
  styleUrl: './employees-list.scss'
})
export class EmployeesListComponent implements OnInit {
  employees: Employee[] = [];
  loading = false;
  error: string | null = null;

  EmployeeRole = EmployeeRole;

  constructor(
    private employeesService: EmployeesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    this.error = null;

    this.employeesService.getAll().subscribe({
      next: (data) => {
        console.log('employees received:', data);
        this.employees = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('error loading employees', err); // <--- LOG
        this.error = err.error?.message || 'Erro ao carregar funcionários';
        this.loading = false;
      }
    });
  }

  create(): void {
    this.router.navigate(['/employees/new']);
  }

  edit(employee: Employee): void {
    if (!employee.id) return;
    this.router.navigate(['/employees', employee.id]);
  }

  delete(employee: Employee): void {
    if (!employee.id) return;
    if (!confirm(`Deseja realmente excluir ${employee.firstName} ${employee.lastName}?`)) {
      return;
    }

    this.employeesService.delete(employee.id).subscribe({
      next: () => this.load(),
      error: (err) => {
        alert(err.error?.message || 'Erro ao excluir funcionário');
      }
    });
  }

  getRoleName(role: EmployeeRole | number | null | undefined): string {
    if (role === EmployeeRole.Employee) return 'Employee';
    if (role === EmployeeRole.Leader) return 'Leader';
    if (role === EmployeeRole.Director) return 'Director';
    return String(role ?? '');
  }
}