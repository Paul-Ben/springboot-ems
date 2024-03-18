package net.paul.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import net.paul.app.entity.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    
}
