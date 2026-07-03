package com.student.Repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.student.Entity.Student;

@Repository
public interface StudentRepo extends JpaRepository<Student, Integer> {
}
