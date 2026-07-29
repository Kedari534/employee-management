package com.kedari.mapper;

import com.kedari.dto.EmployeeDTO;
import com.kedari.entity.Employee;
import com.kedari.entity.Department;

public class EmployeeMapper {
    public static EmployeeDTO toDTO(Employee employee) {
        if (employee == null) return null;
        return EmployeeDTO.builder()
                .id(employee.getId())
                .firstName(employee.getFirstName())
                .lastName(employee.getLastName())
                .email(employee.getEmail())
                .status(employee.getStatus().name())
                .departmentId(employee.getDepartment() != null ? employee.getDepartment().getId() : null)
                .departmentName(employee.getDepartment() != null ? employee.getDepartment().getName() : null)
                .profilePhotoUrl(employee.getProfilePhotoUrl())
                .build();
    }

    public static Employee toEntity(EmployeeDTO dto, Department department) {
        if (dto == null) return null;
        return Employee.builder()
                .id(dto.getId())
                .firstName(dto.getFirstName())
                .lastName(dto.getLastName())
                .email(dto.getEmail())
                .status(Employee.EmployeeStatus.valueOf(dto.getStatus()))
                .department(department)
                .profilePhotoUrl(dto.getProfilePhotoUrl())
                .build();
    }
}
