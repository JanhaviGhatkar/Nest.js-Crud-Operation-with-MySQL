export enum employeeRole {
    Employee = 'Employee',
    HR = 'HR',
    Manager = 'Manager',
    Sales = 'Sales',
  }
  
  export type Employee = {
    name: string;
    phone: number;
    email: string;
    city: string;
    role: employeeRole; // Use the enum type for the role field
  }
