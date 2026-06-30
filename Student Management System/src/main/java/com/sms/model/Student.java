package com.sms.model;

public class Student {

	public int id;
	public String name;
	public String email;
	public int rollno;
	public String address;
	public String Course;
	
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public int getRollno() {
		return rollno;
	}
	public void setRollno(int rollno) {
		this.rollno = rollno;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getCourse() {
		return Course;
	}
	public void setCourse(String course) {
		Course = course;
	}
	public Student(int id, String name, String email, int rollno, String newAddr, String course) {
		super();
		this.id = id;
		this.name = name;
		this.email = email;
		this.rollno = rollno;
		this.address = newAddr;
		Course = course;
	}
	
	
}
