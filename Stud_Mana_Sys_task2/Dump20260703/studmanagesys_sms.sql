-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost    Database: studmanagesys
-- ------------------------------------------------------
-- Server version	8.0.42

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `sms`
--

DROP TABLE IF EXISTS `sms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sms` (
  `id` int NOT NULL AUTO_INCREMENT,
  `address` varchar(255) DEFAULT NULL,
  `course` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `rollno` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sms`
--

LOCK TABLES `sms` WRITE;
/*!40000 ALTER TABLE `sms` DISABLE KEYS */;
INSERT INTO `sms` VALUES (1,'Pune','Java Full Stack','aarav@example.com','Aarav Sharma',101),(2,'Mumbai','Mern Full Stack','vivaan@example.com','Vivaan Patel',102),(3,'Bangalore','Python Data Science','aditya@example.com','Aditya Rao',103),(4,'Pune','Mern Full Stack','neon@example.com','Neon Method',104),(5,'Nagpur','Java Full Stack','sai@example.com','Sai Joshi',105),(6,'Delhi','Cyber Security','reyansh@example.com','Reyansh Gupta',106),(7,'Hyderabad','Cloud Computing','krishna@example.com','Krishna Verma',107),(8,'Pune','Java Full Stack','ishaan@example.com','Ishaan Mishra',108),(9,'Mumbai','Mern Full Stack','shaurya@example.com','Shaurya Singh',109),(10,'Chennai','Python Data Science','arjun@example.com','Arjun Nair',110),(11,'Chennai','Java Full Stack','ananya@example.com','Ananya Iyer',111),(12,'Pune','Mern Full Stack','diya@example.com','Diya Kulkarni',112),(13,'Nashik','Cyber Security','pari@example.com','Pari Deshmukh',113),(14,'Kolkata','Cloud Computing','pihu@example.com','Pihu Choudhury',114),(15,'Hyderabad','Java Full Stack','aadhya@example.com','Aadhya Reddy',115),(16,'Ahmedabad','Mern Full Stack','rohan@example.com','Rohan Mehta',116),(17,'Surat','Python Data Science','amit@example.com','Amit Trivedi',117),(18,'Bangalore','Java Full Stack','rahul@example.com','Rahul Dravid',118),(19,'Jaipur','Cyber Security','vikram@example.com','Vikram Rathore',119),(20,'Bhopal','Cloud Computing','sameer@example.com','Sameer Khan',120),(21,'Mumbai','Java Full Stack','kabir@example.com','Kabir Thapar',121),(22,'Noida','Mern Full Stack','manish@example.com','Manish Pandey',122),(23,'Indore','Python Data Science','gaurav@example.com','Gaurav Saxena',123),(24,'Delhi','Java Full Stack','sid@example.com','Siddharth Malhotra',124),(25,'Patna','Cyber Security','utkarsh@example.com','Utkarsh Mishra',125);
/*!40000 ALTER TABLE `sms` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-07-04  0:29:10
