import { IsEmail, IsEnum, IsInt, IsNotEmpty, Length } from 'class-validator';

enum employeeRole {
  Employee = 'Employee',
  Manager = 'Manager',
  HR = 'HR',
  Sales = 'Sales',
}

export class employeeDTO {
  @IsNotEmpty()
  @Length(1, 25)
  name: string;

  @IsInt()
  phone: number;

  @IsNotEmpty()
  @IsEmail()
  @Length(2, 30)
  email: string;

  @IsNotEmpty()
  @Length(1, 20)
  city: string;

  @IsNotEmpty()
  @IsEnum(employeeRole) // Use the UserRole enum for validation
  role: employeeRole;
}
