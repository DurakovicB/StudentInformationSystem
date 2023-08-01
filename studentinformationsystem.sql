CREATE DATABASE  IF NOT EXISTS `studentinformationsystem` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `studentinformationsystem`;
-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: studentinformationsystem
-- ------------------------------------------------------
-- Server version	8.0.31

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
-- Table structure for table `classes`
--

DROP TABLE IF EXISTS `classes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `classes` (
  `course_id` int DEFAULT NULL,
  `classroom` varchar(50) DEFAULT NULL,
  `starting_time` int DEFAULT NULL,
  `type` varchar(10) DEFAULT NULL,
  `professor_name` varchar(100) DEFAULT NULL,
  `day` varchar(10) DEFAULT NULL,
  `active` varchar(10) NOT NULL DEFAULT 'true',
  `classes_id` int NOT NULL AUTO_INCREMENT,
  `professor_id` int DEFAULT NULL,
  PRIMARY KEY (`classes_id`)
) ENGINE=MyISAM AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `classes`
--

LOCK TABLES `classes` WRITE;
/*!40000 ALTER TABLE `classes` DISABLE KEYS */;
INSERT INTO `classes` VALUES (19,'ITLab315',9,'lecture','Dino Keco','Monday','true',1,2),(20,'ITLab316',11,'lab','Aldin Kovacevic','Monday','true',2,11),(20,'ITLab316',15,'lecture','Sulejman Sarajlija','Tuesday','true',3,8),(22,'RA02',17,'lecture','Nermina Durmic','Monday','true',4,9),(22,'ITLab315',13,'lab','Aldin Kovacevic','Tuesday','true',5,11),(22,'ITLab316',15,'lab','Aldin Kovacevic','Thursday','true',6,11),(22,'ITLab315',15,'lab','Naida Fatic','Thursday','false',7,13),(19,'ITLab128',13,'lab','Zehra Sikira','Tuesday','false',8,12),(21,'Cinema Hall',9,'lecture','Adnan Miljkovic','Tuesday','true',9,10),(21,'ITLab128',11,'lab','Adnan Miljkovic','Tuesday','true',10,10),(21,'ITLab316',13,'lab','Adnan Miljkovic','Wednesday','true',11,10),(21,'ITLab316',15,'lab','Adnan Miljkovic','Wednesday','true',12,10),(23,'RA02',9,'lecture','Elma Avdic','Wednesday','true',13,4),(23,'ITLab128',9,'lab','Elma Avdic','Friday','true',14,4),(19,'ITLab128',11,'lab','Zehra Sikira','Friday','true',15,12),(19,'ITLab316',15,'lab','Becir Isakovic','Friday','true',16,7);
/*!40000 ALTER TABLE `classes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course`
--

DROP TABLE IF EXISTS `course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `course` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `description` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `professor_id` int unsigned DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `professor` (`professor_id`) USING BTREE,
  CONSTRAINT `professor` FOREIGN KEY (`professor_id`) REFERENCES `professor` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course`
--

LOCK TABLES `course` WRITE;
/*!40000 ALTER TABLE `course` DISABLE KEYS */;
INSERT INTO `course` VALUES (19,'Machine Learning','This course introduces students to the concepts and algorithms of machine learning. Topics include supervised and unsupervised learning, regression, classification, and clustering.',2),(20,'Advanced Web3 Topics','In this advanced course, students explore cutting-edge topics related to Web3 technologies, including blockchain, decentralized applications, and smart contracts.',8),(21,'Secure System Development','This course focuses on secure software development practices. Students learn about common vulnerabilities, security testing, and secure coding techniques.',10),(22,'Software Engineering','Software Engineering covers the entire software development lifecycle. Topics include requirements gathering, design, testing, and maintenance of software systems.',9),(23,'Mobile & Wireless Networking','This course delves into the principles of mobile and wireless networking. Students learn about protocols, network architectures, and mobile application development.',4),(24,'DevOps Engineering','DevOps Engineering explores the integration of development and operations teams to improve the software delivery process. Topics include continuous integration, continuous deployment, and infrastructure as code.',14);
/*!40000 ALTER TABLE `course` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notification`
--

DROP TABLE IF EXISTS `notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notification` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL,
  `description` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notification`
--

LOCK TABLES `notification` WRITE;
/*!40000 ALTER TABLE `notification` DISABLE KEYS */;
INSERT INTO `notification` VALUES (1,'Regarding exam registration','Dear Students, on the LMS you can find a video tutorial on how to register for your exams. Please be aware that students will not be able to do exams that they haven\'t previously registered for.','2023-04-12 13:39:48'),(2,'Happy Holidays','The staff of the University wishes you happy holidays. We hope to see you soon!','2023-04-17 13:17:33'),(3,'Erasmus Information','Information about upcoming erasmus programs will be available on our website. Be sure to check it regularly.','2023-05-17 13:21:01'),(4,'Happy New Hijri Year','We wish all students the best for the upcoming holidays regarding new Hijri year.','2023-07-22 11:50:58');
/*!40000 ALTER TABLE `notification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `professor`
--

DROP TABLE IF EXISTS `professor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `professor` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `fullname` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `phone` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `dateofbirth` date DEFAULT NULL,
  `gender` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `professor`
--

LOCK TABLES `professor` WRITE;
/*!40000 ALTER TABLE `professor` DISABLE KEYS */;
INSERT INTO `professor` VALUES (1,'dzelilam@gmail.com','Dzelila Mehanovic','061827455','1990-12-12','Female'),(2,'dinokeco@ibu.edu.ba','Dino Keco','062234123','1973-04-12','Male'),(4,'elma.avdic@ibu.edu.ba','Elma Avdic','061332412','1975-04-01','Female'),(5,'saidasultanic@stu.ibu.edu.ba','Saida Sultanic','062445611','1967-02-07','Female'),(7,'becirisakovic@ibu.edu.ba','Becir Isakovic','06222435','1996-06-09','male'),(8,'sulejman.sarajlija@ibu.edu.ba','Sulejman Sarajlija','(202) 555-0123','1980-05-15','male'),(9,'nermina.durmic@ibu.edu.ba','Nermina Durmic','(415) 555-9876','1975-11-22','female'),(10,'adnan.miljkovic@ibu.edu.ba','Adnan Miljkovic','(212) 555-2345','1988-08-10','male'),(11,'aldin.kovacevic@ibu.edu.ba','Aldin Kovacevic','(305) 555-6789','1983-02-28','male'),(12,'zehra.sikira@ibu.edu.ba','Zehra Sikira','(213) 555-4321','1990-07-07','female'),(13,'naida.fatic@ibu.edu.ba','Naida Fatic','(404) 555-8765','1985-09-12','female'),(14,'dzenana.dzevlan@ibu.edu.ba','Dzenana Dzevlan','(312) 555-0198','1982-04-03','female');
/*!40000 ALTER TABLE `professor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student`
--

DROP TABLE IF EXISTS `student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `fullname` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `phone` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `gender` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student`
--

LOCK TABLES `student` WRITE;
/*!40000 ALTER TABLE `student` DISABLE KEYS */;
INSERT INTO `student` VALUES (1,'ahmed.durakovic@gmail.ba','Ahmed Durakovic','1231231231','Male'),(2,'melisa22@gmail.com','Melisa Brulic','44','female'),(3,'merisa4@gmai.com','Merisa Brrulic','4122','female'),(4,'bilal.durakovic@stu.ibu.edu.ba','Bilal Durakovic','062030834','male'),(5,'farisrizvanovic@gmail.com','Faris Rizvanovic','322412','male');
/*!40000 ALTER TABLE `student` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student_courses`
--

DROP TABLE IF EXISTS `student_courses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student_courses` (
  `student_id` int unsigned NOT NULL,
  `course_id` int unsigned NOT NULL,
  `percentage_total_amount` int DEFAULT NULL,
  `percentage_acquired` int DEFAULT NULL,
  `grade_title` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `course` (`course_id`) USING BTREE,
  KEY `student` (`student_id`) USING BTREE,
  CONSTRAINT `course` FOREIGN KEY (`course_id`) REFERENCES `course` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `student` FOREIGN KEY (`student_id`) REFERENCES `student` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student_courses`
--

LOCK TABLES `student_courses` WRITE;
/*!40000 ALTER TABLE `student_courses` DISABLE KEYS */;
INSERT INTO `student_courses` VALUES (1,19,NULL,NULL,'enrolment grade',30),(1,20,NULL,NULL,'enrolment grade',31),(1,21,NULL,NULL,'enrolment grade',32),(1,22,NULL,NULL,'enrolment grade',33),(1,23,NULL,NULL,'enrolment grade',34),(1,24,NULL,NULL,'enrolment grade',35),(2,19,NULL,NULL,'enrolment grade',36),(2,20,NULL,NULL,'enrolment grade',37),(2,21,NULL,NULL,'enrolment grade',38),(2,23,NULL,NULL,'enrolment grade',39),(2,24,NULL,NULL,'enrolment grade',40),(3,19,NULL,NULL,'enrolment grade',41),(3,20,NULL,NULL,'enrolment grade',42),(3,22,NULL,NULL,'enrolment grade',43),(3,23,NULL,NULL,'enrolment grade',44),(3,24,NULL,NULL,'enrolment grade',45),(4,19,NULL,NULL,'enrolment grade',46),(4,21,NULL,NULL,'enrolment grade',48),(4,22,NULL,NULL,'enrolment grade',49),(4,24,NULL,NULL,'enrolment grade',51),(5,19,NULL,NULL,'enrolment grade',52),(5,21,NULL,NULL,'enrolment grade',53),(5,22,NULL,NULL,'enrolment grade',54),(5,23,NULL,NULL,'enrolment grade',55),(5,24,NULL,NULL,'enrolment grade',56);
/*!40000 ALTER TABLE `student_courses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `student_id` int unsigned DEFAULT NULL,
  `professor_id` int DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'ahmed@ibu.edu.ba','202cb962ac59075b964b07152d234b70',1,NULL),(2,'bilal@ibu.edu.ba','202cb962ac59075b964b07152d234b70',4,NULL),(3,'dino.keco@ibu.edu.ba','202cb962ac59075b964b07152d234b70',0,2);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-01 11:46:06
