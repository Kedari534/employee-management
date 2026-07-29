package com.kedari.controller;

import com.kedari.dto.EmployeeDTO;
import com.kedari.service.EmployeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/employees")
@RequiredArgsConstructor
public class EmployeeController {
    private final EmployeeService employeeService;

    @GetMapping
    public ResponseEntity<Map<String, Object>> getAllEmployees() {
        List<EmployeeDTO> employees = employeeService.getAllEmployees();
        Map<String, Object> response = new HashMap<>();
        response.put("data", employees);
        response.put("success", true);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getStats() {
        List<EmployeeDTO> employees = employeeService.getAllEmployees();
        long total = employees.size();
        long active = employees.stream().filter(e -> "ACTIVE".equals(e.getStatus())).count();
        long onLeave = employees.stream().filter(e -> "ON_LEAVE".equals(e.getStatus())).count();
        
        Map<String, Long> headcounts = employees.stream()
            .filter(e -> e.getDepartmentName() != null)
            .collect(java.util.stream.Collectors.groupingBy(EmployeeDTO::getDepartmentName, java.util.stream.Collectors.counting()));
        
        Map<String, Object> stats = new HashMap<>();
        stats.put("total", total);
        stats.put("active", active);
        stats.put("onLeave", onLeave);
        stats.put("headcounts", headcounts);
        
        Map<String, Object> response = new HashMap<>();
        response.put("data", stats);
        response.put("success", true);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getEmployeeById(@PathVariable Long id) {
        EmployeeDTO employee = employeeService.getEmployeeById(id);
        Map<String, Object> response = new HashMap<>();
        response.put("data", employee);
        response.put("success", true);
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> createEmployee(@RequestBody EmployeeDTO dto) {
        EmployeeDTO created = employeeService.createEmployee(dto);
        Map<String, Object> response = new HashMap<>();
        response.put("data", created);
        response.put("success", true);
        response.put("message", "Employee created successfully");
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Map<String, Object>> updateEmployee(@PathVariable Long id, @RequestBody EmployeeDTO dto) {
        EmployeeDTO updated = employeeService.updateEmployee(id, dto);
        Map<String, Object> response = new HashMap<>();
        response.put("data", updated);
        response.put("success", true);
        response.put("message", "Employee updated successfully");
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> deleteEmployee(@PathVariable Long id) {
        employeeService.deleteEmployee(id);
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Employee deleted successfully");
        return ResponseEntity.ok(response);
    }
}
