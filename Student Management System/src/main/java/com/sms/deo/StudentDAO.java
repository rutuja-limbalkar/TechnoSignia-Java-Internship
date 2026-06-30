package com.sms.deo;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import com.sms.model.Student;

public class StudentDAO {

	private static final String URL = "jdbc:mysql://localhost:3306/sms_db";
	private static final String USERNAME = "root";
	private static final String PASSWORD = "rutuja";

	// Reusable connection method
	private Connection getConnection() {
		Connection con = null;
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
			con = DriverManager.getConnection(URL, USERNAME, PASSWORD);
		} catch (ClassNotFoundException e) {
			System.out.println("Driver class not found! Check your build path jar: " + e.getMessage());
		} catch (SQLException e) {
			System.out.println("Database connection failed: " + e.getMessage());
		}
		return con;
	}
	
	// Helper method to safely validate connection states
	private boolean isConnectionInvalid(Connection conn) {
		if (conn == null) {
			System.out.println("Cannot proceed: database connection is offline.");
			return true;
		}
		return false;
	}

	// 1. ADD STUDENT
	public boolean addStudent(Student s) {
		String query = "INSERT INTO students(id, name, email, rollno, address, course) VALUES(?,?,?,?,?,?)";
		Connection conn = getConnection();
		
		if (isConnectionInvalid(conn)) return false;

		try (PreparedStatement p = conn.prepareStatement(query)) {
			p.setInt(1, s.getId());
			p.setString(2, s.getName());
			p.setString(3, s.getEmail());
			p.setInt(4, s.getRollno());
			p.setInt(5, s.getAddress());
			p.setString(6, s.getCourse());
			
			return p.executeUpdate() > 0;
		} catch (SQLException e) {
			System.out.println("Database execution error: " + e.getMessage());
			return false;
		}
	}

	// 2. VIEW ALL STUDENTS
	public List<Student> getAllStudents() {
		List<Student> li = new ArrayList<>();
		String query = "SELECT * FROM students";
		Connection conn = getConnection();

		if (isConnectionInvalid(conn)) return li;

		try (Statement st = conn.createStatement();
			 ResultSet rs = st.executeQuery(query)) {

			while (rs.next()) {
				Student s = new Student(
						rs.getInt("id"),
						rs.getString("name"),
						rs.getString("email"),
						rs.getInt("rollno"),
						rs.getInt("address"),
						rs.getString("course")
				);
				li.add(s);
			}
		} catch (SQLException e) {
			System.out.println("Database fetch error: " + e.getMessage());
		}
		return li;
	}

	// 3. SEARCH STUDENT BY ID
	public Student getStudentById(int id) {
		String query = "SELECT * FROM students WHERE id = ?";
		Connection conn = getConnection();

		if (isConnectionInvalid(conn)) return null;

		try (PreparedStatement stmt = conn.prepareStatement(query)) {
			stmt.setInt(1, id);
			try (ResultSet rs = stmt.executeQuery()) {
				if (rs.next()) {
					return new Student(
							rs.getInt("id"),
							rs.getString("name"),
							rs.getString("email"),
							rs.getInt("rollno"),
							rs.getInt("address"),
							rs.getString("course")
					);
				}
			}
		} catch (SQLException e) {
			System.out.println("Database search error: " + e.getMessage());
		}
		return null;
	}

	// 4. UPDATE STUDENT
	public boolean updateStudent(Student student) {
		String query = "UPDATE students SET name = ?, email = ?, rollno = ?, address = ?, course = ? WHERE id = ?";
		Connection conn = getConnection();

		if (isConnectionInvalid(conn)) return false;

		try (PreparedStatement st = conn.prepareStatement(query)) {
			st.setString(1, student.getName());
			st.setString(2, student.getEmail());
			st.setInt(3, student.getRollno());
			st.setInt(4, student.getAddress());
			st.setString(5, student.getCourse());
			st.setInt(6, student.getId());
            
			return st.executeUpdate() > 0;
		} catch (SQLException e) {
			System.out.println("Database update error: " + e.getMessage());
			return false;
		}
	}

	// 5. DELETE STUDENT
	public boolean deleteStudent(int id) {
		String query = "DELETE FROM students WHERE id = ?";
		Connection conn = getConnection();

		if (isConnectionInvalid(conn)) return false;

		try (PreparedStatement st = conn.prepareStatement(query)) {
			st.setInt(1, id);
			return st.executeUpdate() > 0;
		} catch (SQLException e) {
			System.out.println("Database delete error: " + e.getMessage());
			return false;
		}
	}
}