package com.student.entity;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name="SMS")

public class Student {

@Id
@GeneratedValue(strategy=GenerationType.IDENTITY)
private Integer id;

private boolean active = true; // Default to active

@CreationTimestamp
private LocalDateTime createdAt;

@NotBlank(message="Name is Mandatory and cannot be empty")
private String name;

@NotBlank(message="Email is Mandatory")
@Email(message="please provide a valid email address")
private String email;

@NotNull(message="Roll number is mandatory")
@Min(value=1,message="Roll no must be greater thatn 0")
private Integer rollno;

@NotBlank(message="Course is mandatory")
private String course;

@NotBlank(message="Address is mandatory")
private String address;

@NotBlank(message="Password is mandatory")
@Pattern(
	    regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$",
	    message = "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character"
	)
private String password;

}

