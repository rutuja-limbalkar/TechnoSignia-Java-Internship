package com.student.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.student.entity.Student;
import com.student.repo.StudentRepo;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins="*")
public class AuthController {

	@Autowired
	private StudentRepo repo;
	
	@PostMapping("/signup")
	public ResponseEntity<String>registerStudent(@Valid @RequestBody Student student){
		if(repo.findFirstByEmail(student.getEmail()).isPresent()) {
			return new ResponseEntity<>("Email already registered",HttpStatus.BAD_REQUEST);
		}
		repo.save(student);
		return new ResponseEntity<>("Student signed up successfully",HttpStatus.CREATED);
	}
	
	@PostMapping("/login")
	public ResponseEntity<String>loginStudent(@RequestBody Student loginRequest){
		Optional<Student> opt=repo.findFirstByEmail(loginRequest.getEmail());
		
		if(opt.isPresent()) {
			Student student=opt.get();
			
			if(student.getPassword()==null || loginRequest.getPassword()==null) {
				return new ResponseEntity<>("Invalid credentials or password not set",HttpStatus.UNAUTHORIZED);
			}
			if(student.getPassword().equals(loginRequest.getPassword())) {
				return new ResponseEntity<>("Login successfully",HttpStatus.OK);
			}
		}
		return new ResponseEntity<>("Invalid email or password",HttpStatus.UNAUTHORIZED);
	}
}
