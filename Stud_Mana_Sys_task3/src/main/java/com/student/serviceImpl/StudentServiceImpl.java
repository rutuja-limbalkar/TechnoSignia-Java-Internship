package com.student.serviceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.student.entity.Student;
import com.student.repo.StudentRepo;
import com.student.service.StudentService;

@Service
public class StudentServiceImpl implements StudentService {

    @Autowired
    private StudentRepo repo;

    @Override
    public Student saveStudent(Student student) {    
        return repo.save(student);
    }

    @Override
    public Student getStudentById(Integer id) {
        return repo.findById(id).orElse(null);
    }

    @Override
    public Student updateStudent(Integer id, Student student) {
        Student exist = repo.findById(id).orElse(null);
        if (exist != null) {
            exist.setName(student.getName());
            exist.setEmail(student.getEmail());
            exist.setCourse(student.getCourse());
            exist.setRollno(student.getRollno());
            exist.setAddress(student.getAddress()); // Added address update since it's in your entity
            return repo.save(exist);
        }
        return null;
    }

    @Override
    public void deleteStudent(Integer id) {
        repo.deleteById(id);
    }

    private Pageable createPageable(int pageNo, int pageSize, String sortBy, String sortDir) {
        Sort sort = sortDir.equalsIgnoreCase("desc") ? Sort.by(sortBy).descending() : Sort.by(sortBy).ascending();
        return PageRequest.of(pageNo, pageSize, sort);
    }

    @Override
    public Page<Student> getAllStudents(int pageNo, int pageSize, String sortBy, String sortDir) {
        return repo.findAll(createPageable(pageNo, pageSize, sortBy, sortDir));
    }

    @Override
    public Page<Student> searchByName(String name, int pageNo, int pageSize, String sortBy, String sortDir) {
        return repo.findByName(name, createPageable(pageNo, pageSize, sortBy, sortDir));
    }

    @Override
    public Page<Student> searchByEmail(String email, int pageNo, int pageSize, String sortBy, String sortDir) {
        return repo.findByEmail(email, createPageable(pageNo, pageSize, sortBy, sortDir));
    }

    @Override
    public Page<Student> searchByCourse(String course, int pageNo, int pageSize, String sortBy, String sortDir) {
        return repo.findByCourse(course, createPageable(pageNo, pageSize, sortBy, sortDir));
    }

    @Override
    public Page<Student> searchByRollno(Integer rollno, int pageNo, int pageSize, String sortBy, String sortDir) {
        return repo.findByRollno(rollno, createPageable(pageNo, pageSize, sortBy, sortDir));
    }
    
    @Override
    public Page<Student> searchByCity(String city, int pageNo, int pageSize, String sortBy, String sortDir) {
        return repo.findByAddress(city, createPageable(pageNo, pageSize, sortBy, sortDir));
    }
}