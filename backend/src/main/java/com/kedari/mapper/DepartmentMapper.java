package com.kedari.mapper;

import com.kedari.dto.DepartmentDTO;
import com.kedari.entity.Department;

public class DepartmentMapper {
    public static DepartmentDTO toDTO(Department department) {
        if (department == null) return null;
        return DepartmentDTO.builder()
                .id(department.getId())
                .name(department.getName())
                .build();
    }

    public static Department toEntity(DepartmentDTO dto) {
        if (dto == null) return null;
        return Department.builder()
                .id(dto.getId())
                .name(dto.getName())
                .build();
    }
}
