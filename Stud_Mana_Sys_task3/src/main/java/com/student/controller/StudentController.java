package com.student.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.student.entity.Student;
import com.student.service.StudentService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/students")
@CrossOrigin(origins="*")
public class StudentController {

	@Autowired
    private StudentService service;

    @PostMapping
    public ResponseEntity<Student> createStudent(@Valid @RequestBody Student student) {
        Student savedStudent= service.saveStudent(student);
        return new ResponseEntity<>(savedStudent,HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Student> getStudentById(@PathVariable Integer id) {
        Student student= service.getStudentById(id);
        if(student==null) {
        	throw new RuntimeException("Student record not found with Id: "+id);
        }
        return new ResponseEntity<>(student,HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Student> updateStudent(@PathVariable Integer id, @RequestBody Student student) {
        Student updateStudent= service.updateStudent(id, student);
        if(updateStudent== null) {
        	throw new RuntimeException("Cannot update.Student not found with this Id: "+id);
        }
        return new ResponseEntity<>(updateStudent,HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteStudent(@PathVariable Integer id) {
        Student student=service.getStudentById(id);
        if(student==null) {
        	throw new RuntimeException("Cannot delete.Student record not found with ID: "+id);
        }
        service.deleteStudent(id);
        return new ResponseEntity<>("Student deleted successfully with Id: " + id,HttpStatus.OK);
    }
    
    @GetMapping
    public Page<Student> getAllStudents(
            @RequestParam(defaultValue = "0") int pageNo,
            @RequestParam(defaultValue = "5") int pageSize,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDir) {
        return service.getAllStudents(pageNo, pageSize, sortBy, sortDir);
    }

    // 2. SEARCH BY NAME
    @GetMapping("/search/name")
    public Page<Student> searchByName(
            @RequestParam String name,
            @RequestParam(defaultValue = "0") int pageNo,
            @RequestParam(defaultValue = "5") int pageSize,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDir) {
        return service.searchByName(name, pageNo, pageSize, sortBy, sortDir);
    }

    // 3. SEARCH BY EMAIL
    @GetMapping("/search/email")
    public Page<Student> searchByEmail(
            @RequestParam String email,
            @RequestParam(defaultValue = "0") int pageNo,
            @RequestParam(defaultValue = "5") int pageSize,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDir) {
        return service.searchByEmail(email, pageNo, pageSize, sortBy, sortDir);
    }

    // 4. SEARCH BY DEPARTMENT (COURSE)
    @GetMapping("/search/course")
    public Page<Student> searchByCourse(
            @RequestParam String course,
            @RequestParam(defaultValue = "0") int pageNo,
            @RequestParam(defaultValue = "5") int pageSize,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDir) {
       return service.searchByCourse(course, pageNo, pageSize, sortBy, sortDir);
    }

    // 5. SEARCH BY CITY (ADDRESS)
    @GetMapping("/search/rollno")
    public Page<Student> searchByRollno(
            @RequestParam Integer rollno, // FIXED: Type changed from String to Integer
            @RequestParam(defaultValue = "0") int pageNo,
            @RequestParam(defaultValue = "5") int pageSize,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDir) {
        return service.searchByRollno(rollno, pageNo, pageSize, sortBy, sortDir);
    }
    
    @GetMapping("/search/city")
    public Page<Student> searchByCity(
            @RequestParam String city,
            @RequestParam(defaultValue = "0") int pageNo,
            @RequestParam(defaultValue = "5") int pageSize,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDir) {
        return service.searchByCity(city, pageNo, pageSize, sortBy, sortDir);
    }
    		
}
