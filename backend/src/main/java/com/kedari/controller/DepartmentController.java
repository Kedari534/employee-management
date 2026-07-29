package com.kedari.controller;

import com.kedari.entity.Department;
import com.kedari.service.DepartmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/departments")
@RequiredArgsConstructor
public class DepartmentController {
    private final DepartmentService departmentService;

    @GetMapping
    public ResponseEntity<Map<String, Object>> getAllDepartments() {
        List<Department> departments = departmentService.getAllDepartments();
        Map<String, Object> response = new HashMap<>();
        response.put("data", departments);
        response.put("success", true);
        return ResponseEntity.ok(response);
    }
}
