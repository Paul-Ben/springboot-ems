package net.paul.app.service;

import java.util.List;

import net.paul.app.dto.EmployeeDto;

public interface EmployeeService {
    EmployeeDto createEmployee(EmployeeDto employeeDto);

    EmployeeDto getEmployeeById(Long empId);

    List<EmployeeDto> getAllEmployees();

    EmployeeDto updateEmployee(Long empId, EmployeeDto updatedEmployee);

    void deleteEmployee(Long empId);
}
