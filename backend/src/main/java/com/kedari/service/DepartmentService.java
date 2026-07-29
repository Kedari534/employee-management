package com.kedari.service;

import com.kedari.entity.Department;
import com.kedari.repository.DepartmentRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DepartmentService {
    private final DepartmentRepository departmentRepository;

    @PostConstruct
    public void init() {
        if (departmentRepository.count() == 0) {
            departmentRepository.save(Department.builder().name("Engineering").build());
            departmentRepository.save(Department.builder().name("Human Resources").build());
            departmentRepository.save(Department.builder().name("Marketing").build());
            departmentRepository.save(Department.builder().name("Finance").build());
        }
    }

    public List<Department> getAllDepartments() {
        return departmentRepository.findAll();
    }

    public Department getDepartmentById(Long id) {
        return departmentRepository.findById(id).orElseThrow(() -> new RuntimeException("Department not found"));
    }
}
