export enum EmployeeRole {
  Employee = 1,
  Leader = 2,
  Director = 3
}

export interface Phone {
  id?: string;
  number: string;
  type: string;
}

export interface Employee {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  docNumber: string;
  birthDate: string;
  role: EmployeeRole;
  managerId?: string | null;
  managerName?: string | null;
  phones: Phone[];
  createdAt?: string;
  isActive?: boolean;
}

export interface CreateEmployeeRequest {
  firstName: string;
  lastName: string;
  email: string;
  docNumber: string;
  birthDate: string;
  password: string;
  role: EmployeeRole;
  managerId?: string | null;
  phones: { number: string; type: string }[];
}