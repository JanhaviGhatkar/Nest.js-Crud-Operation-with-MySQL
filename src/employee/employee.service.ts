import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Pool } from 'mysql2/typings/mysql/lib/Pool';
import { pool } from 'src/Database/mysql.connection';
import { Employee } from 'src/types';

@Injectable()
export class EmployeeService {
  async getAllEmployees() {
    const connection = await pool.getConnection();
    try {
      const [data] = await connection.query('select * from employees');
      if (!data[0]) {
        return { Mesaage: 'No data found' };
      }
      return data;
    } catch (error) {
      throw new Error('Failed to create employee: ' + error.message);
    } finally {
      connection.release();
    }
  }

  async getEmployeeById(id: number) {
    const connection = await pool.getConnection();
    try {
      const [data] = await connection.query(
        `select * from employees where id = ${id}`,
      );
      if (!data[0]) {
        return { Mesaage: 'No data found' };
      }
      return data;
    } catch (error) {
      throw new Error('Failed to create employee: ' + error.message);
    } finally {
      connection.release();
    }
  }
  async getEmployeeByRole(role: string) {
    const connection = await pool.getConnection();
    try {
      const [data] = await connection.query(
        `select * from employees where role = "${role}";`,
      );
      if (!data[0]) {
        return { status: 400, Message: 'No data found with this role' };
      }
      return { Status: 200, Message: 'Data Found', data };
    } catch (error) {
      throw new Error('Failed to create employee: ' + error.message);
    } finally {
      connection.release();
    }
  }

  async postEmployee(employee: Employee) {
    const connection = await pool.getConnection();
    try {
      const [existed_emaila] = await connection.query(
        `select * from employees where email= "${employee.email}"`,
      );
      if (existed_emaila && existed_emaila[0]) {
        return { Status: 200, Message: 'Data found', existed_emaila };
      }
      const [existed_phone] = await connection.query(
        `select * from employees where phone= ${employee.phone}`,
      );
      if (existed_phone && existed_phone[0]) {
        return { Status: 200, Message: 'Data found', existed_phone };
      }
      const [data] = await connection.query(
        `insert into employees (name,phone,email,city,role) values (?,?,?,?,?)`,
        [
          employee.name,
          employee.phone,
          employee.email,
          employee.city,
          employee.role,
        ],
      );
      console.log(data);
      const insertedData = {
        name: employee.name,
        phone: employee.phone,
        email: employee.email,
        city: employee.city,
        role: employee.role,
      };
      return { Status: 200, Message: 'Data created', Data: insertedData };
    } catch (error) {
      throw new Error('Failed to create employee: ' + error.message);
    } finally {
      connection.release();
    }
  }

  async updateEmployee(id: number, employee: Employee) {
    const connection = await pool.getConnection();
    try {
      const [data] = await connection.query(
        `select * from employees where id = ${id}`,
      );
      if (!data[0]) {
        return new HttpException(
          `No Employee fond with id ${id}`,
          HttpStatus.NOT_FOUND,
        );
      }
      const updateQuery = `update employees set name=? ,phone =?, email=?, city=?, role=? where id = ${id}`;
      const updatedData = [
       employee.name,
        employee.phone,
        employee.email,
        employee.city,
        employee.role,
        
      ];
      const [updateResult] = await connection.query(updateQuery,updatedData) 
      if (!updateResult){
        return { Status: 500, Message: 'No data updated' };
      }
      return { Status: 200, Message: 'Data updated' };
    } catch (error) {
      throw new Error('Failed to create employee: ' + error.message);
    } finally {
      connection.release();
    }
  }

  async updatePhoneNumber(id: number, employee : Employee){
    const connection = await pool.getConnection();
    try {
      const [data] = await connection.query(
        `select * from employees where id = ${id}`,
      );
      if (!data[0]) {
        return new HttpException(
          `No Employee fond with id ${id}`,
          HttpStatus.NOT_FOUND,
        );
      }

      const updateQuery = `update employees set phone = ${employee.phone} where id = ${id};`
      const [result] = await connection.query(updateQuery);
      if (!result[0]){
        return { Status: 500, Message: 'No data updated' };
      }
      return { Status: 200, Message: 'Data updated' };
    } catch (error) {
      throw new Error('Failed to create employee: ' + error.message);
    } finally {
      connection.release();
    }
  }

  async deleteEmployeeBYId(id :number){
    const connection = await pool.getConnection();
    try {
      const [data] = await connection.query(
        `select * from employees where id = ${id}`,
      );
      if (!data[0]) {
        return new HttpException(
          `No Employee fond with id ${id}`,
          HttpStatus.NOT_FOUND,
        );
      }
  
        const [result] = await connection.query(`delete from employees where id = ${id}`);
        console.log(result);
         result
        return { Status: 200, Message: 'Data Deleteing process complete' };

    } catch (error) {
      
    } 
  }
}
