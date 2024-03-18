package net.paul.app.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;
import net.paul.app.dto.EmployeeDto;
import net.paul.app.service.EmployeeService;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/employees")
@AllArgsConstructor
public class EmployeeController {
    
    private EmployeeService employeeService;

    @PostMapping("/add")
    public ResponseEntity<EmployeeDto> createEmployee(@RequestBody EmployeeDto employeeDto){
        EmployeeDto savedEmployee = employeeService.createEmployee(employeeDto);
        return new ResponseEntity< >(savedEmployee, HttpStatus.CREATED);
    }

    @GetMapping("{empId}")
    public ResponseEntity<EmployeeDto> getEmployeeById(@PathVariable Long empId){
        EmployeeDto employeeByid = employeeService.getEmployeeById(empId);
        // return new ResponseEntity<>(employeeByid, HttpStatus.OK);
        return ResponseEntity.ok(employeeByid);
    }

    @GetMapping
    public ResponseEntity<List<EmployeeDto>> getAllEmployees(){
        List<EmployeeDto> employees = employeeService.getAllEmployees();
        return ResponseEntity.ok(employees);
    }

    @PutMapping("{empId}")
    public ResponseEntity<EmployeeDto> updateEmployee(@PathVariable Long empId, @RequestBody EmployeeDto updatedEmployee){
        EmployeeDto updatedEmp = employeeService.updateEmployee(empId, updatedEmployee);
        return ResponseEntity.ok(updatedEmp);
    }

    @DeleteMapping("{empId}")
    public ResponseEntity<String> deleteEmployee(@PathVariable Long empId){
        employeeService.deleteEmployee(empId);
        return ResponseEntity.ok("Employee Deleted");
    }
}
