package com.student.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.student.Entity.Student;
import com.student.service.StudentService;

@RestController
@RequestMapping("/students")
public class StudentController {

    @Autowired
    private StudentService service;

    @PostMapping
    public Student createStudent(@RequestBody Student student) {
        return service.saveStudent(student);
    }

    @GetMapping
    public List<Student> getAllStudents() {
        return service.getAllStudents();
    }

    @GetMapping("/{id}")
    public Student getStudentById(@PathVariable Integer id) {
        return service.getStudentById(id);
    }

    @DeleteMapping("/{id}")
    public String deleteStudent(@PathVariable Integer id) {
    	service.deleteStudent(id);
        return "Student deleted successfully with Id: " + id;
    }
    
    @PutMapping("/{id}")
    public Student updateStudent(@PathVariable Integer id, @RequestBody Student student) {
        return service.updateStudent(id, student);
    }
}
