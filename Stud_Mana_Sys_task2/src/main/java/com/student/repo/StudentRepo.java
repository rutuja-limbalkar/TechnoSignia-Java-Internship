package com.student.repo;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.student.entity.Student;

@Repository
public interface StudentRepo extends JpaRepository<Student,Integer>{


	Page<Student> findByName(String name,Pageable pageable);
	Page<Student> findByEmail(String email, Pageable pageable);
	Page<Student> findByCourse(String course, Pageable pageable);
	Page<Student> findByRollno(Integer rollno, Pageable pageable);
	Page<Student> findByAddress(String address, Pageable pageable);
}
