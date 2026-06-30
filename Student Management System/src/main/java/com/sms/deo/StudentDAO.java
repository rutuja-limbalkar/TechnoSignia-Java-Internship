package com.sms.deo;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.sms.model.Student;

public class StudentDAO {

	private static final String FILE_NAME = "students.txt";
	private final Gson gson = new Gson();
	
	private void saveAlltoFile(List<Student> list) {
		try (BufferedWriter w = new BufferedWriter(new FileWriter(FILE_NAME))) {
			w.write(gson.toJson(list));
		} catch (IOException e) {
			System.out.println("Error writing to file: " + e.getMessage());
		}
	}
	
	public boolean addStudent(Student s) {
		List<Student> students = getAllStudents();
		students.add(s);
		saveAlltoFile(students);
		return true;
	}

	public List<Student> getAllStudents() {
		File file = new File(FILE_NAME);
		if (!file.exists()) return new ArrayList<>();
		
		try (BufferedReader r = new BufferedReader(new FileReader(file))) {
			java.lang.reflect.Type listType = new TypeToken<ArrayList<Student>>(){}.getType();
			List<Student> list = gson.fromJson(r, listType);
			return list != null ? list : new ArrayList<>();
		} catch (IOException e) {
			System.out.println("Error reading file: " + e.getMessage());
			return new ArrayList<>();
		}
	}

	public Student getStudentById(int id) {
		for (Student s : getAllStudents()) {
			if (s.getId() == id) return s;
		}
		return null;
	}

	public boolean updateStudent(Student updateStudent) {
		List<Student> students = getAllStudents();
		for (int i = 0; i < students.size(); i++) {
			if (students.get(i).getId() == updateStudent.getId()) {
				students.set(i, updateStudent);
				saveAlltoFile(students);
				return true;
			}
		}
		return false;
	}

	public boolean deleteStudent(int id) {
		List<Student> students = getAllStudents();
		boolean removed = students.removeIf(s -> s.getId() == id);
		if (removed) {
			saveAlltoFile(students);
			return true;
		}
		return false;
	}
}