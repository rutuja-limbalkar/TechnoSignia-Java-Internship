package com.student.service;

import org.springframework.data.domain.Page;

import com.student.entity.Student;

public interface StudentService {

	Student saveStudent(Student student);
	Student getStudentById(Integer id);
	Student updateStudent(Integer id,Student student);
	void deleteStudent(Integer id);
	
	Page <Student> getAllStudents(int pageNo,int pageSize, String sortBy, String sortDir);
	Page<Student> searchByName(String name,int pageNo,int pageSize,String sortBy, String sortDir);
	Page<Student> searchByEmail(String email,int pageNo,int pageSize,String sortBy,String sortDir);
	Page<Student> searchByCourse(String course,int pageNo,int pageSize,String sortBy, String sortDir);
	Page<Student> searchByRollno(Integer rollno, int pageNo, int pageSize, String sortBy, String sortDir);
	Page<Student> searchByCity(String city, int pageNo, int pageSize, String sortBy, String sortDir);
}
