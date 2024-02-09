import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { employeeDTO } from 'src/DTO/employeeDto';


@Controller('employee')
export class EmployeeController {
    constructor(private readonly employeeService : EmployeeService){}

    @Get("")
    getAllEmployee(){
        return this.employeeService.getAllEmployees();
    }
    @Get(":id")
    getEmployeeById(@Param("id" ,ParseIntPipe) id:number){
        return this.employeeService.getEmployeeById(id);
    }
    @Get("employeeByRole/:role")
    getEmployeeByRole(@Param("role") role:string){
        return this.employeeService.getEmployeeByRole(role);
    }
    @Post("newEmployee")
    @UsePipes(new ValidationPipe())
    addnewEmployee(@Body() employeeDto : employeeDTO){
        return this.employeeService.postEmployee(employeeDto);
    }

    @Put("updateEmployee/:id")
    @UsePipes(new ValidationPipe())
    updateEmployee(@Param("id", ParseIntPipe) id :number, @Body() employeeDto :employeeDTO){
        return this.employeeService.updateEmployee(id,employeeDto)
    }
    
    @Patch("updatePhone/:id")
    updatePhoneById(@Param("id" , ParseIntPipe) id:number, @Body() employeeDto:employeeDTO){
        return this.employeeService.updatePhoneNumber(id,employeeDto)
    }

    @Delete("deleteEmp/:id")
    deleteEmployeeById(@Param("id" ,ParseIntPipe) id: number){
        return this.employeeService.deleteEmployeeBYId(id);
    }

}
