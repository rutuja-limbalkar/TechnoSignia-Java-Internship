package com.sms.main;

import java.util.List;
import java.util.Scanner;
import com.sms.deo.StudentDAO;
import com.sms.model.Student;

public class Main {
    
    private static final Scanner sc = new Scanner(System.in);

    // Reusable helper method to remove repeated try-catch blocks for numbers
    private static int readInt(String prompt) {
        while (true) {
            System.out.print(prompt);
            try {
                return Integer.parseInt(sc.nextLine());
            } catch (NumberFormatException e) {
                System.out.println("Invalid number! Please type integers only.");
            }
        }
    }

    public static void main(String[] args) {
        StudentDAO dao = new StudentDAO();

        while (true) {
            System.out.println("\n=== Student Management System ===");
            System.out.println("1. Add Student\n2. View All Students\n3. Search Student");
            System.out.println("4. Update Student\n5. Delete Student\n6. Exit");
            
            int choice = readInt("Enter Your choice: ");

            switch (choice) {
                case 1:
                    int id = readInt("Enter Id: ");
                    System.out.print("Enter Name: ");
                    String name = sc.nextLine();
                    System.out.print("Enter Email: ");
                    String email = sc.nextLine();
                    int roll = readInt("Enter Roll No: ");
                    int address = readInt("Enter Address: ");
                    System.out.print("Enter Course: ");
                    String course = sc.nextLine();

                    Student s = new Student(id, name, email, roll, address, course);
                    if (dao.addStudent(s)) {
                        System.out.println("Stored to database successfully!");
                    }
                    break;
                    
                case 2:
                    List<Student> stu = dao.getAllStudents();
                    if (stu.isEmpty()) {
                        System.out.println("Table is empty.");
                    } else {
                        for (Student student : stu) {
                            System.out.println("Id " + student.getId() + " | Name: " + student.getName() + " | Course: " + student.getCourse() + " | Email " + student.getEmail());
                        }
                    }
                    break;
                    
                case 3:
                    int searchId = readInt("Enter Student Id: ");
                    Student found = dao.getStudentById(searchId);
                    if (found != null) {
                        System.out.println("Found -> Name: " + found.getName() + ", Course: " + found.getCourse() + ", Email: " + found.getEmail());
                    } else {
                        System.out.println("No matching ID found inside database.");
                    }
                    break;
                    
                case 4:
                    int updateId = readInt("Enter update Id to update the data: ");
                    Student existing = dao.getStudentById(updateId);
                    
                    if (existing != null) {
                        System.out.println("\n--- Current Details (Press Enter to keep current value) ---");
                        
                        // 1. Update Name
                        System.out.print("New Name (" + existing.getName() + "): ");
                        String newName = sc.nextLine();
                        if (newName.trim().isEmpty()) {
                            newName = existing.getName(); // Keep old value if empty
                        }

                        // 2. Update Email
                        System.out.print("New Email (" + existing.getEmail() + "): ");
                        String newEmail = sc.nextLine();
                        if (newEmail.trim().isEmpty()) {
                            newEmail = existing.getEmail();
                        }

                        // 3. Update Roll Number
                        System.out.print("New Roll (" + existing.getRollno() + "): ");
                        String rollInput = sc.nextLine();
                        int newRoll = rollInput.trim().isEmpty() ? existing.getRollno() : Integer.parseInt(rollInput);

                        // 4. Update Address (What you want to change)
                        System.out.print("New Address Code (" + existing.getAddress() + "): ");
                        String addrInput = sc.nextLine();
                        int newAddr = addrInput.trim().isEmpty() ? existing.getAddress() : Integer.parseInt(addrInput);

                        // 5. Update Course
                        System.out.print("New Course (" + existing.getCourse() + "): ");
                        String newCourse = sc.nextLine();
                        if (newCourse.trim().isEmpty()) {
                            newCourse = existing.getCourse();
                        }   
                        
                        // Save the mixed object back to your existing StudentDAO update method
                        Student updated = new Student(updateId, newName, newEmail, newRoll, newAddr, newCourse);
                        if (dao.updateStudent(updated)) {
                            System.out.println("Data updated successfully!");
                        }
                    } else {
                        System.out.println("Student profile not found.");
                    }
                    break;
                    
                case 5:
                    int deleteId = readInt("Enter target Id to delete: ");
                    if (dao.deleteStudent(deleteId)) {
                        System.out.println("Record deleted successfully.");
                    } else {
                        System.out.println("Target record missing.");
                    }
                    break;
                    
                case 6:
                    System.out.println("Exiting the context... Goodbye!");
                    sc.close();
                    System.exit(0);
                    
                default:
                    System.out.println("Select a number between 1 and 6.");
            }
        }
    }
}