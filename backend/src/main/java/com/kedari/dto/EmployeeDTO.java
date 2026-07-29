package com.kedari.dto;

import com.kedari.entity.Employee;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EmployeeDTO {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String status;
    private Long departmentId;
    private String departmentName;
    private String profilePhotoUrl;
}
