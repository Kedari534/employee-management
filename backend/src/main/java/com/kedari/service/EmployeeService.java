package com.kedari.service;

import com.kedari.dto.EmployeeDTO;
import com.kedari.entity.Department;
import com.kedari.entity.Employee;
import com.kedari.mapper.EmployeeMapper;
import com.kedari.repository.DepartmentRepository;
import com.kedari.repository.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EmployeeService {
    private final EmployeeRepository employeeRepository;
    private final DepartmentRepository departmentRepository;

    public List<EmployeeDTO> getAllEmployees() {
        return employeeRepository.findAll().stream()
                .map(EmployeeMapper::toDTO)
                .collect(Collectors.toList());
    }

    public EmployeeDTO getEmployeeById(Long id) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found"));
        return EmployeeMapper.toDTO(employee);
    }

    public EmployeeDTO createEmployee(EmployeeDTO dto) {
        Department department = null;
        if (dto.getDepartmentId() != null) {
            department = departmentRepository.findById(dto.getDepartmentId())
                    .orElseThrow(() -> new RuntimeException("Department not found"));
        }
        Employee employee = EmployeeMapper.toEntity(dto, department);
        Employee saved = employeeRepository.save(employee);
        return EmployeeMapper.toDTO(saved);
    }

    public EmployeeDTO updateEmployee(Long id, EmployeeDTO dto) {
        Employee existing = employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found"));
        
        Department department = null;
        if (dto.getDepartmentId() != null) {
            department = departmentRepository.findById(dto.getDepartmentId())
                    .orElseThrow(() -> new RuntimeException("Department not found"));
        }

        existing.setFirstName(dto.getFirstName());
        existing.setLastName(dto.getLastName());
        existing.setEmail(dto.getEmail());
        existing.setStatus(Employee.EmployeeStatus.valueOf(dto.getStatus()));
        existing.setDepartment(department);

        Employee saved = employeeRepository.save(existing);
        return EmployeeMapper.toDTO(saved);
    }

    public void deleteEmployee(Long id) {
        employeeRepository.deleteById(id);
    }
}
