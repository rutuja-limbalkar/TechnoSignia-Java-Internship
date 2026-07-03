package com.student.service;

import java.util.List;

import com.student.Entity.Student;

public interface StudentService {

	Student saveStudent(Student student);
    List<Student> getAllStudents();
    Student getStudentById(Integer id);
    void deleteStudent(Integer id);
    Student updateStudent(Integer id, Student student);
}
