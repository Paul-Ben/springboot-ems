package net.paul.app.service;


import java.util.List;
// import java.util.stream.Collector;
// import java.util.stream.Collectors;


import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import net.paul.app.dto.EmployeeDto;
import net.paul.app.entity.Employee;
import net.paul.app.exception.ResourceNotFoundException;
import net.paul.app.mapper.EmployeeMapper;
import net.paul.app.repository.EmployeeRepository;

@Service
@AllArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

    private EmployeeRepository employeeRepository;
    
    @Override
    public EmployeeDto createEmployee(EmployeeDto employeeDto) {
        Employee employee = EmployeeMapper.mapToEmployee(employeeDto);
        Employee savedEmployee = employeeRepository.save(employee);
        
        return EmployeeMapper.mapToEmployeeDto(savedEmployee);
    }

    @Override
    public EmployeeDto getEmployeeById(Long empId) {
        Employee employee = employeeRepository.findById(empId)
                .orElseThrow(()-> new ResourceNotFoundException("Employee with the given ID: " + empId + " does not exist."));
        return EmployeeMapper.mapToEmployeeDto(employee);
    }

    @Override
    public List<EmployeeDto> getAllEmployees() {
        List<Employee> employees = employeeRepository.findAll();
        // return employees.stream().map((employee)-> EmployeeMapper.mapToEmployeeDto(employee)).collect(Collectors.toList());
        return employees.stream().map((employee)->EmployeeMapper.mapToEmployeeDto(employee)).toList();

    }

    @Override
    public EmployeeDto updateEmployee(Long empId, EmployeeDto updatedEmployee) {
        Employee employee = employeeRepository.findById(empId)
            .orElseThrow(()-> new ResourceNotFoundException("Employee with ID: " + empId + " not found."));

        employee.setFirstName(updatedEmployee.getFirstName());
        employee.setLastName(updatedEmployee.getLastName());
        employee.setEmail(updatedEmployee.getEmail());
        Employee updatedEmployeeobj = employeeRepository.save(employee);
        return EmployeeMapper.mapToEmployeeDto(updatedEmployeeobj);
    }

    @Override
    public void deleteEmployee(Long empId) {
        Employee employee = employeeRepository.findById(empId)
            .orElseThrow(()-> new ResourceNotFoundException("Employee with ID: " +empId+" not found."));
        employeeRepository.delete(employee);
    }
 
    

    
  
    
}
