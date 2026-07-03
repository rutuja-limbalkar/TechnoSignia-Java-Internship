package com.student.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.student.Entity.Student;
import com.student.Repo.StudentRepo;
import com.student.service.StudentService;

@Service
public class StudentServiceImpl implements StudentService{

	@Autowired
    private StudentRepo repo;

	@Override
    public Student saveStudent(Student student) {
        return repo.save(student);
    }

	@Override
    public List<Student> getAllStudents() {
        return repo.findAll();
    }

	@Override
    public Student getStudentById(Integer id) {
        return repo.findById(id).orElse(null);
    }

	@Override
    public void deleteStudent(Integer id) {
        repo.deleteById(id);
    }
    
    @Override
    public Student updateStudent(Integer id, Student student) {
        Student exist = repo.findById(id).orElse(null);
        if (exist != null) {
            exist.setName(student.getName());
            exist.setEmail(student.getEmail());
            exist.setRollno(student.getRollno());
            exist.setCourse(student.getCourse());
            exist.setAddress(student.getAddress());
            return repo.save(exist);
        }
        return null;
    }
}
