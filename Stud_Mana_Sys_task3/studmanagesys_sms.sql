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
  `password` varchar(255) DEFAULT NULL,
  `active` bit(1) NOT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sms`
--

LOCK TABLES `sms` WRITE;
/*!40000 ALTER TABLE `sms` DISABLE KEYS */;
INSERT INTO `sms` VALUES (2,'Mumbai','Mern Full Stack','vivaan@example.com','Vivaan Patel',102,NULL,_binary '\0',NULL),(3,'Bangalore','Python Data Science','aditya@example.com','Aditya Rao',103,NULL,_binary '\0',NULL),(4,'Pune','Mern Full Stack','neon@example.com','Neon Method',104,NULL,_binary '\0',NULL),(5,'Nagpur','Java Full Stack','sai@example.com','Sai Joshi',105,NULL,_binary '\0',NULL),(6,'Delhi','Cyber Security','reyansh@example.com','Reyansh Gupta',106,NULL,_binary '\0',NULL),(7,'Hyderabad','Cloud Computing','krishna@example.com','Krishna Verma',107,NULL,_binary '\0',NULL),(9,'Mumbai','Mern Full Stack','shaurya@example.com','Shaurya Singh',109,NULL,_binary '\0',NULL),(10,'Chennai','Python Data Science','arjun@example.com','Arjun Nair',110,NULL,_binary '\0',NULL),(11,'Chennai','Java Full Stack','ananya@example.com','Ananya Iyer',111,NULL,_binary '\0',NULL),(12,'Pune','Mern Full Stack','diya@example.com','Diya Kulkarni',112,NULL,_binary '\0',NULL),(13,'Nashik','Cyber Security','pari@example.com','Pari Deshmukh',113,NULL,_binary '\0',NULL),(14,'Kolkata','Cloud Computing','pihu@example.com','Pihu Choudhury',114,NULL,_binary '\0',NULL),(15,'Hyderabad','Java Full Stack','aadhya@example.com','Aadhya Reddy',115,NULL,_binary '\0',NULL),(16,'Ahmedabad','Mern Full Stack','rohan@example.com','Rohan Mehta',116,NULL,_binary '\0',NULL),(17,'Surat','Python Data Science','amit@example.com','Amit Trivedi',117,NULL,_binary '\0',NULL),(18,'Bangalore','Java Full Stack','rahul@example.com','Rahul Dravid',118,NULL,_binary '\0',NULL),(19,'Jaipur','Cyber Security','vikram@example.com','Vikram Rathore',119,NULL,_binary '\0',NULL),(20,'Bhopal','Cloud Computing','sameer@example.com','Sameer Khan',120,NULL,_binary '\0',NULL),(21,'Mumbai','Java Full Stack','kabir@example.com','Kabir Thapar',121,NULL,_binary '\0',NULL),(22,'Noida','Mern Full Stack','manish@example.com','Manish Pandey',122,NULL,_binary '\0',NULL),(23,'Indore','Python Data Science','gaurav@example.com','Gaurav Saxena',123,NULL,_binary '\0',NULL),(24,'Delhi','Java Full Stack','sid@example.com','Siddharth Malhotra',124,NULL,_binary '\0',NULL),(25,'Patna','Cyber Security','utkarsh@example.com','Utkarsh Mishra',125,NULL,_binary '\0',NULL),(26,'Pune','Java Full Stack','rutuja@example.com','Rutuja',120,'password123',_binary '\0',NULL),(27,'Pune','Java Full Stack','aarav@example.com','Aarav Sharma',1001,'aaravPassword123',_binary '\0',NULL),(28,'Pune','Java Full Stack','aarav@example.com','Aarav Sharma',101,'aaravPassword123',_binary '\0',NULL),(30,'Beed','java full Stack Developer  ','rutujajain044@gmail.com','Rutuja Nitin Limbalkar',1,'111',_binary '\0',NULL),(31,'jalna','python full stack developer','xyz@gmail.com','xyz',2,'Xyz@1213',_binary '\0',NULL),(32,'jalna','python full stack developer','abc@gmail.com','abc',3,'Pass@111',_binary '\0',NULL),(33,'jalna','python full stack developer','aaa@gmail.com','aaa',67,'Pass@123',_binary '\0',NULL),(34,'Beed','python full stack developer','rutu@gmail.com','Rutuja Nitin Limbalkar',1,'Pass@123',_binary '\0',NULL);
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

-- Dump completed on 2026-07-23 15:37:16
