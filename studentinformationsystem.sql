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
  `starting_time` int DEFAULT NULL,
  `type` varchar(10) DEFAULT NULL,
  `day` int DEFAULT NULL,
  `active` varchar(10) NOT NULL DEFAULT 'true',
  `id` int NOT NULL AUTO_INCREMENT,
  `professor_id` int DEFAULT NULL,
  `classroom_id` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `classes`
--

LOCK TABLES `classes` WRITE;
/*!40000 ALTER TABLE `classes` DISABLE KEYS */;
INSERT INTO `classes` VALUES (19,9,'lecture',1,'true',1,2,1),(20,11,'lab',1,'true',2,11,2),(20,15,'lecture',2,'true',3,8,2),(22,17,'lecture',1,'true',4,9,3),(22,13,'lab',2,'true',5,11,1),(22,15,'lab',4,'true',6,11,2),(22,15,'lab',4,'false',7,13,1),(19,13,'lab',2,'false',8,12,4),(21,9,'lecture',2,'true',9,10,5),(21,11,'lab',2,'true',10,10,4),(21,13,'lab',3,'true',11,10,2),(21,15,'lab',3,'true',12,10,2),(23,9,'lecture',3,'true',13,4,3),(23,9,'lab',5,'true',14,4,4),(19,11,'lab',5,'true',15,12,4),(19,15,'lab',5,'true',16,7,2);
/*!40000 ALTER TABLE `classes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `classroom`
--

DROP TABLE IF EXISTS `classroom`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `classroom` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `capacity` int NOT NULL,
  `description` text,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `classroom`
--

LOCK TABLES `classroom` WRITE;
/*!40000 ALTER TABLE `classroom` DISABLE KEYS */;
INSERT INTO `classroom` VALUES (1,'ITLab315',50,'IT Lab room on the 3rd floor'),(2,'ITLab316',45,'IT Lab room on the 3rd floor'),(3,'RA02',60,'Room for Research and Analysis'),(4,'ITLab128',40,'IT Lab room on the 1st floor'),(5,'Cinema Hall',120,'Large cinema hall for events');
/*!40000 ALTER TABLE `classroom` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course`
--

LOCK TABLES `course` WRITE;
/*!40000 ALTER TABLE `course` DISABLE KEYS */;
INSERT INTO `course` VALUES (19,'Machine Learning','This course introduces students to the concepts and algorithms of machine learning. Topics include supervised and unsupervised learning, regression, classification, and clustering.',2),(20,'Advanced Web3 Topics','In this advanced course, students explore cutting-edge topics related to Web3 technologies, including blockchain, decentralized applications, and smart contracts.',8),(21,'Secure System Development','This course focuses on secure software development practices. Students learn about common vulnerabilities, security testing, and secure coding techniques.',10),(22,'Software Engineering','Software Engineering covers the entire software development lifecycle. Topics include requirements gathering, design, testing, and maintenance of software systems.',9),(23,'Mobile & Wireless Networking','This course delves into the principles of mobile and wireless networking. Students learn about protocols, network architectures, and mobile application development.',4),(25,'Discrete Mathematics','Exploration of mathematical structures and concepts with a focus on discrete and separate values.',2),(26,'Data Structures','Examination of fundamental data structures and their practical applications in programming.',2),(27,'Object Oriented Programming','Introduction to the principles of object-oriented programming and the utilization of design patterns.',10);
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
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notification`
--

LOCK TABLES `notification` WRITE;
/*!40000 ALTER TABLE `notification` DISABLE KEYS */;
INSERT INTO `notification` VALUES (1,'Regarding exam registration','Dear Students, on the LMS you can find a video tutorial on how to register for your exams. Please be aware that students will not be able to do exams that they haven\'t previously registered for.','2023-04-12 13:39:48'),(2,'Happy Holidays','The staff of the University wishes you happy holidays. We hope to see you soon!','2023-04-17 13:17:33'),(3,'Erasmus Information','Information about upcoming erasmus programs will be available on our website. Be sure to check it regularly.','2023-05-17 13:21:01'),(5,'Upcoming Exam','Your upcoming exam for Data Structures is scheduled for next week.','2023-07-15 07:00:00'),(6,'Course Announcement','A new course, Advanced Algorithms, has been added to your curriculum.','2023-07-17 12:30:00'),(7,'Assignment Deadline','Reminder: The deadline for submitting the OOP project is approaching.','2023-07-20 16:00:00'),(9,'Welcome to University','Welcome to our prestigious university! We are excited to have you as part of our student community. Explore our courses and resources.','2023-07-15 07:00:00'),(10,'Student Orientation','Join us for the student orientation event on July 20th. Get to know your professors, fellow students, and the campus environment.','2023-07-17 12:30:00'),(11,'Library Resources','Our university library offers a vast collection of books, research papers, and online resources. Visit the library to enhance your knowledge.','2023-07-20 16:00:00'),(12,'Career Development Workshop','Attend the career development workshop on July 25th to learn about interview techniques, resume building, and job opportunities.','2023-07-25 08:15:00'),(13,'Machine Learning Final Exam','The final exam is scheduled on 13.9.2023. Good luck!','2023-08-27 12:46:45');
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
  `office` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `professor`
--

LOCK TABLES `professor` WRITE;
/*!40000 ALTER TABLE `professor` DISABLE KEYS */;
INSERT INTO `professor` VALUES (1,'dzelila.mehanovic@ibu.edu.ba','Dzelila Mehanovic','061827455','1990-12-12','Female','Office 307'),(2,'dino.keco@ibu.edu.ba','Dino Keco','062234123','1973-04-12','Male','Office 301'),(4,'elma.avdic@ibu.edu.ba','Elma Avdic','061332412','1975-04-01','Female','Office 220'),(5,'saida.sultanic@ibu.edu.ba','Saida Sultanic','062445611','1967-02-07','Female','Office 303'),(7,'becir.isakovic@ibu.edu.ba','Becir Isakovic','06222435','1996-06-09','male','Office 221'),(8,'sulejman.sarajlija@ibu.edu.ba','Sulejman Sarajlija','(202) 555-0123','1980-05-15','male','Office 210'),(9,'nermina.durmic@ibu.edu.ba','Nermina Durmic','(415) 555-9876','1975-11-22','female','Office 317'),(10,'adnan.miljkovic@ibu.edu.ba','Adnan Miljkovic','(212) 555-2345','1988-08-10','male','Office 312'),(11,'aldin.kovacevic@ibu.edu.ba','Aldin Kovacevic','(305) 555-6789','1983-02-28','male','Office 302'),(12,'zehra.sikira@ibu.edu.ba','Zehra Sikira','(213) 555-4321','1990-07-07','female','Office 227'),(13,'naida.fatic@ibu.edu.ba','Naida Fatic','(404) 555-8765','1985-09-12','female','Office 313'),(14,'dzenana.dzevlan@ibu.edu.ba','Dzenana Dzevlan','(312) 555-0198','1982-04-03','female','Office 211');
/*!40000 ALTER TABLE `professor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `space`
--

DROP TABLE IF EXISTS `space`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `space` (
  `id` int NOT NULL AUTO_INCREMENT,
  `course_id` int NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `content` text,
  `created_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `space`
--

LOCK TABLES `space` WRITE;
/*!40000 ALTER TABLE `space` DISABLE KEYS */;
INSERT INTO `space` VALUES (12,26,'Homework Submission','Please remember to submit your weekly homework assignments on time. You can find the assignments and submission details in the \"Assignments\" section of the course on your Learning Management System (LMS). If you have any questions, feel free to ask in this space.',NULL),(13,26,'Lecture Recap','For those who missed the previous lecture or would like a recap, you can access the recorded lecture and lecture slides by clicking [here](insert_link). The material covered in the last class is essential for our upcoming discussions on machine learning algorithms.',NULL),(14,26,'Discussion Topic: Model Evaluation','Let\'s dive deep into model evaluation methods this week. I\'ve posted a detailed article on this topic in the \"Resources\" section. Take some time to read through it and share your thoughts and questions here.',NULL),(15,26,'Guest Speaker Session','We have a special guest speaker joining us this Friday to discuss real-world applications of machine learning in healthcare. Don\'t miss this opportunity to gain insights from an industry expert. Mark your calendars!',NULL),(16,26,'Group Project Update','Our group project on \"Predictive Analytics in Finance\" is progressing well. Team members, please check the project board for updates and make sure to meet the upcoming deadlines. Let\'s work together to excel in this project.',NULL);
/*!40000 ALTER TABLE `space` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `space_reactions`
--

DROP TABLE IF EXISTS `space_reactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `space_reactions` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `student_id` int DEFAULT NULL,
  `space_id` int DEFAULT NULL,
  `comment` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `space_reactions`
--

LOCK TABLES `space_reactions` WRITE;
/*!40000 ALTER TABLE `space_reactions` DISABLE KEYS */;
/*!40000 ALTER TABLE `space_reactions` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=196 DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student`
--

LOCK TABLES `student` WRITE;
/*!40000 ALTER TABLE `student` DISABLE KEYS */;
INSERT INTO `student` VALUES (1,'ahmed.durakovic@stu.ibu.edu.ba','Ahmed Durakovic','61243234','Male'),(2,'melisa.brulic@stu.ibu.edu.ba','Melisa Brulic','62887334','female'),(3,'merisa.brrulic@stu.ibu.edu.ba','Merisa Brrulic','671672653','female'),(4,'bilal.durakovic@stu.ibu.edu.ba','Bilal Durakovic','062030834','male'),(5,'faris.rizvanovic@stu.ibu.edu.ba','Faris Rizvanovic','64655281','male'),(104,'john.doe@stu.ibu.edu.ba','John Doe','555-1234','Male'),(105,'jane.smith@stu.ibu.edu.ba','Jane Smith','555-5678','Female'),(106,'robert.johnson@stu.ibu.edu.ba','Robert Johnson','555-9876','Male'),(107,'emily.davis@stu.ibu.edu.ba','Emily Davis','555-4321','Female'),(108,'michael.wilson@stu.ibu.edu.ba','Michael Wilson','555-8765','Male'),(109,'sarah.lee@stu.ibu.edu.ba','Sarah Lee','555-5432','Female'),(110,'william.anderson@stu.ibu.edu.ba','William Anderson','555-7890','Male'),(111,'jennifer.brown@stu.ibu.edu.ba','Jennifer Brown','555-2109','Female'),(112,'david.martin@stu.ibu.edu.ba','David Martin','555-6543','Male'),(113,'mary.white@stu.ibu.edu.ba','Mary White','555-3210','Female'),(114,'james.hall@stu.ibu.edu.ba','James Hall','555-8901','Male'),(115,'patricia.garcia@stu.ibu.edu.ba','Patricia Garcia','555-3456','Female'),(116,'richard.martinez@stu.ibu.edu.ba','Richard Martinez','555-9012','Male'),(117,'linda.rodriguez@stu.ibu.edu.ba','Linda Rodriguez','555-6789','Female'),(118,'charles.gonzalez@stu.ibu.edu.ba','Charles Gonzalez','555-1098','Male'),(119,'elizabeth.hernandez@stu.ibu.edu.ba','Elizabeth Hernandez','555-2345','Female'),(120,'joseph.perez@stu.ibu.edu.ba','Joseph Perez','555-8901','Male'),(121,'susan.wilson@stu.ibu.edu.ba','Susan Wilson','555-4567','Female'),(122,'thomas.moore@stu.ibu.edu.ba','Thomas Moore','555-9876','Male'),(123,'margaret.taylor@stu.ibu.edu.ba','Margaret Taylor','555-8765','Female'),(124,'daniel.adams@stu.ibu.edu.ba','Daniel Adams','555-3456','Male'),(125,'nancy.turner@stu.ibu.edu.ba','Nancy Turner','555-5432','Female'),(126,'paul.lewis@stu.ibu.edu.ba','Paul Lewis','555-6789','Male'),(127,'karen.king@stu.ibu.edu.ba','Karen King','555-1098','Female'),(128,'george.jackson@stu.ibu.edu.ba','George Jackson','555-3210','Male'),(129,'betty.scott@stu.ibu.edu.ba','Betty Scott','555-5678','Female'),(130,'mark.clark@stu.ibu.edu.ba','Mark Clark','555-9876','Male'),(131,'lisa.walker@stu.ibu.edu.ba','Lisa Walker','555-2109','Female'),(132,'donald.hall@stu.ibu.edu.ba','Donald Hall','555-5678','Male'),(133,'sandra.hill@stu.ibu.edu.ba','Sandra Hill','555-6543','Female'),(134,'kenneth.green@stu.ibu.edu.ba','Kenneth Green','555-1234','Male'),(135,'ashley.adams@stu.ibu.edu.ba','Ashley Adams','555-8901','Female'),(136,'steven.turner@stu.ibu.edu.ba','Steven Turner','555-4567','Male'),(137,'dorothy.king@stu.ibu.edu.ba','Dorothy King','555-4321','Female'),(138,'edward.hernandez@stu.ibu.edu.ba','Edward Hernandez','555-2109','Male'),(139,'donna.turner@stu.ibu.edu.ba','Donna Turner','555-9876','Female'),(140,'brian.evans@stu.ibu.edu.ba','Brian Evans','555-1098','Male'),(141,'carol.brown@stu.ibu.edu.ba','Carol Brown','555-6543','Female'),(142,'ronald.white@stu.ibu.edu.ba','Ronald White','555-5432','Male'),(143,'ruth.walker@stu.ibu.edu.ba','Ruth Walker','555-4567','Female'),(144,'anthony.davis@stu.ibu.edu.ba','Anthony Davis','555-1234','Male'),(145,'laura.wilson@stu.ibu.edu.ba','Laura Wilson','555-7890','Female'),(146,'kevin.scott@stu.ibu.edu.ba','Kevin Scott','555-5678','Male'),(147,'sharon.martinez@stu.ibu.edu.ba','Sharon Martinez','555-8901','Female'),(148,'jason.harris@stu.ibu.edu.ba','Jason Harris','555-4321','Male'),(149,'cynthia.hall@stu.ibu.edu.ba','Cynthia Hall','555-6543','Female'),(150,'jeffrey.martin@stu.ibu.edu.ba','Jeffrey Martin','555-2109','Male'),(151,'kathleen.turner@stu.ibu.edu.ba','Kathleen Turner','555-5678','Female'),(152,'gary.hernandez@stu.ibu.edu.ba','Gary Hernandez','555-3456','Male'),(153,'deborah.turner@stu.ibu.edu.ba','Deborah Turner','555-8901','Female'),(154,'nicholas.white@stu.ibu.edu.ba','Nicholas White','555-1098','Male'),(155,'jessica.king@stu.ibu.edu.ba','Jessica King','555-3210','Female'),(156,'eric.turner@stu.ibu.edu.ba','Eric Turner','555-5432','Male'),(157,'shirley.lee@stu.ibu.edu.ba','Shirley Lee','555-4567','Female'),(158,'stephen.martinez@stu.ibu.edu.ba','Stephen Martinez','555-6789','Male'),(159,'teresa.smith@stu.ibu.edu.ba','Teresa Smith','555-9876','Female'),(160,'timothy.moore@stu.ibu.edu.ba','Timothy Moore','555-4321','Male'),(161,'helen.anderson@stu.ibu.edu.ba','Helen Anderson','555-5678','Female'),(162,'larry.taylor@stu.ibu.edu.ba','Larry Taylor','555-1098','Male'),(163,'sara.johnson@stu.ibu.edu.ba','Sara Johnson','555-1234','Female'),(164,'josephine.clark@stu.ibu.edu.ba','Josephine Clark','555-3456','Male'),(165,'albert.jackson@stu.ibu.edu.ba','Albert Jackson','555-8901','Female'),(166,'marilyn.scott@stu.ibu.edu.ba','Marilyn Scott','555-6789','Male'),(167,'eugene.king@stu.ibu.edu.ba','Eugene King','555-2109','Female'),(168,'julie.wright@stu.ibu.edu.ba','Julie Wright','555-1234','Male'),(169,'frank.garcia@stu.ibu.edu.ba','Frank Garcia','555-9876','Female'),(170,'doris.wilson@stu.ibu.edu.ba','Doris Wilson','555-5678','Male'),(171,'phillip.adams@stu.ibu.edu.ba','Phillip Adams','555-6543','Female'),(172,'jean.turner@stu.ibu.edu.ba','Jean Turner','555-4321','Male'),(173,'carl.martin@stu.ibu.edu.ba','Carl Martin','555-1098','Female'),(174,'arthur.martinez@stu.ibu.edu.ba','Arthur Martinez','555-7890','Male'),(175,'gloria.green@stu.ibu.edu.ba','Gloria Green','555-3210','Female'),(176,'martha.walker@stu.ibu.edu.ba','Martha Walker','555-9876','Male'),(177,'ryan.white@stu.ibu.edu.ba','Ryan White','555-4321','Female'),(178,'evelyn.turner@stu.ibu.edu.ba','Evelyn Turner','555-5678','Male'),(179,'maria.turner@stu.ibu.edu.ba','Maria Turner','555-2109','Female'),(180,'walter.evans@stu.ibu.edu.ba','Walter Evans','555-5432','Male'),(181,'theresa.lewis@stu.ibu.edu.ba','Theresa Lewis','555-7890','Female'),(182,'henry.gonzalez@stu.ibu.edu.ba','Henry Gonzalez','555-6543','Male'),(183,'brenda.moore@stu.ibu.edu.ba','Brenda Moore','555-5678','Female'),(184,'russell.lopez@stu.ibu.edu.ba','Russell Lopez','555-8901','Male'),(185,'kathryn.harris@stu.ibu.edu.ba','Kathryn Harris','555-1098','Female'),(186,'howard.clark@stu.ibu.edu.ba','Howard Clark','555-3210','Male'),(187,'jacqueline.wright@stu.ibu.edu.ba','Jacqueline Wright','555-4321','Female'),(188,'louis.rodriguez@stu.ibu.edu.ba','Louis Rodriguez','555-7890','Male'),(189,'annie.walker@stu.ibu.edu.ba','Annie Walker','555-4567','Female'),(190,'bobby.harris@stu.ibu.edu.ba','Bobby Harris','555-9876','Male'),(191,'sandra.thomas@stu.ibu.edu.ba','Sandra Thomas','555-2109','Female'),(192,'noah.turner@stu.ibu.edu.ba','Noah Turner','555-4321','Male'),(193,'diane.robinson@stu.ibu.edu.ba','Diane Robinson','555-1098','Female'),(194,'george.thomas@stu.ibu.edu.ba','George Thomas','555-5678','Male'),(195,'rebecca.turner@stu.ibu.edu.ba','Rebecca Turner','555-7890','Female');
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
) ENGINE=InnoDB AUTO_INCREMENT=867 DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student_courses`
--

LOCK TABLES `student_courses` WRITE;
/*!40000 ALTER TABLE `student_courses` DISABLE KEYS */;
INSERT INTO `student_courses` VALUES (1,20,NULL,NULL,'enrolment grade',208),(1,21,NULL,NULL,'enrolment grade',209),(1,22,NULL,NULL,'enrolment grade',210),(1,23,NULL,NULL,'enrolment grade',211),(2,19,NULL,NULL,'enrolment grade',212),(2,21,NULL,NULL,'enrolment grade',214),(2,22,NULL,NULL,'enrolment grade',215),(3,19,NULL,NULL,'enrolment grade',217),(3,20,NULL,NULL,'enrolment grade',218),(3,21,NULL,NULL,'enrolment grade',219),(3,23,NULL,NULL,'enrolment grade',221),(4,19,NULL,NULL,'enrolment grade',222),(4,21,NULL,NULL,'enrolment grade',224),(4,22,NULL,NULL,'enrolment grade',225),(5,21,NULL,NULL,'enrolment grade',229),(5,22,NULL,NULL,'enrolment grade',230),(5,23,NULL,NULL,'enrolment grade',231),(1,20,35,31,'Midterm Exam',236),(1,20,35,39,'Final Exam',237),(1,20,10,7,'Quiz',238),(1,20,20,15,'Project',239),(1,21,35,37,'Midterm Exam',240),(1,21,35,38,'Final Exam',241),(1,21,10,9,'Quiz',242),(1,21,20,17,'Project',243),(1,22,35,34,'Midterm Exam',244),(1,22,35,32,'Final Exam',245),(1,22,10,6,'Quiz',246),(1,22,20,20,'Project',247),(1,23,35,30,'Midterm Exam',248),(1,23,35,37,'Final Exam',249),(1,23,10,7,'Quiz',250),(1,23,20,18,'Project',251),(2,19,35,60,'Midterm Exam',252),(2,19,35,55,'Final Exam',253),(2,19,10,7,'Quiz',254),(2,19,20,12,'Project',255),(2,21,35,70,'Midterm Exam',260),(2,21,35,60,'Final Exam',261),(2,21,10,8,'Quiz',262),(2,21,20,16,'Project',263),(3,19,35,75,'Midterm Exam',268),(3,19,35,72,'Final Exam',269),(3,19,10,8,'Quiz',270),(3,19,20,15,'Project',271),(3,20,35,78,'Midterm Exam',272),(3,20,35,73,'Final Exam',273),(3,20,10,9,'Quiz',274),(3,20,20,17,'Project',275),(3,23,35,72,'Midterm Exam',280),(3,23,35,70,'Final Exam',281),(3,23,10,8,'Quiz',282),(3,23,20,14,'Project',283),(4,19,35,82,'Midterm Exam',284),(4,19,35,88,'Final Exam',285),(4,19,10,9,'Quiz',286),(4,19,20,19,'Project',287),(4,21,35,85,'Midterm Exam',288),(4,21,35,87,'Final Exam',289),(4,21,10,9,'Quiz',290),(4,21,20,18,'Project',291),(4,22,35,90,'Midterm Exam',292),(4,22,35,86,'Final Exam',293),(4,22,10,9,'Quiz',294),(4,22,20,20,'Project',295),(5,21,35,94,'Midterm Exam',300),(5,21,35,91,'Final Exam',301),(5,21,10,10,'Quiz',302),(5,21,20,19,'Project',303),(5,22,35,95,'Midterm Exam',304),(5,22,35,93,'Final Exam',305),(5,22,10,10,'Quiz',306),(5,22,20,20,'Project',307),(5,23,35,92,'Midterm Exam',308),(5,23,35,98,'Final Exam',309),(5,23,10,10,'Quiz',310),(5,23,20,20,'Project',311),(4,19,5,100,'Quiz 2',314),(104,19,NULL,NULL,'enrolment grade',683),(104,20,NULL,NULL,'enrolment grade',684),(105,19,NULL,NULL,'enrolment grade',685),(105,21,NULL,NULL,'enrolment grade',686),(106,19,NULL,NULL,'enrolment grade',687),(106,22,NULL,NULL,'enrolment grade',688),(107,19,NULL,NULL,'enrolment grade',689),(107,23,NULL,NULL,'enrolment grade',690),(108,19,NULL,NULL,'enrolment grade',691),(109,19,NULL,NULL,'enrolment grade',692),(109,25,NULL,NULL,'enrolment grade',693),(110,20,NULL,NULL,'enrolment grade',694),(110,21,NULL,NULL,'enrolment grade',695),(111,20,NULL,NULL,'enrolment grade',696),(111,22,NULL,NULL,'enrolment grade',697),(112,20,NULL,NULL,'enrolment grade',698),(112,23,NULL,NULL,'enrolment grade',699),(113,20,NULL,NULL,'enrolment grade',700),(114,20,NULL,NULL,'enrolment grade',701),(114,25,NULL,NULL,'enrolment grade',702),(115,21,NULL,NULL,'enrolment grade',703),(115,22,NULL,NULL,'enrolment grade',704),(116,21,NULL,NULL,'enrolment grade',705),(116,23,NULL,NULL,'enrolment grade',706),(117,21,NULL,NULL,'enrolment grade',707),(118,21,NULL,NULL,'enrolment grade',708),(118,25,NULL,NULL,'enrolment grade',709),(119,22,NULL,NULL,'enrolment grade',710),(119,23,NULL,NULL,'enrolment grade',711),(120,22,NULL,NULL,'enrolment grade',712),(121,22,NULL,NULL,'enrolment grade',713),(121,25,NULL,NULL,'enrolment grade',714),(122,23,NULL,NULL,'enrolment grade',715),(123,23,NULL,NULL,'enrolment grade',716),(123,25,NULL,NULL,'enrolment grade',717),(124,25,NULL,NULL,'enrolment grade',718),(125,25,NULL,NULL,'enrolment grade',719),(125,26,NULL,NULL,'enrolment grade',720),(126,26,NULL,NULL,'enrolment grade',721),(126,27,NULL,NULL,'enrolment grade',722),(127,26,NULL,NULL,'enrolment grade',723),(127,19,NULL,NULL,'enrolment grade',724),(128,27,NULL,NULL,'enrolment grade',725),(128,20,NULL,NULL,'enrolment grade',726),(129,19,NULL,NULL,'enrolment grade',727),(129,21,NULL,NULL,'enrolment grade',728),(130,20,NULL,NULL,'enrolment grade',729),(130,22,NULL,NULL,'enrolment grade',730),(131,21,NULL,NULL,'enrolment grade',731),(131,23,NULL,NULL,'enrolment grade',732),(132,22,NULL,NULL,'enrolment grade',733),(133,23,NULL,NULL,'enrolment grade',734),(133,25,NULL,NULL,'enrolment grade',735),(134,26,NULL,NULL,'enrolment grade',736),(135,25,NULL,NULL,'enrolment grade',737),(135,27,NULL,NULL,'enrolment grade',738),(136,26,NULL,NULL,'enrolment grade',739),(136,19,NULL,NULL,'enrolment grade',740),(137,27,NULL,NULL,'enrolment grade',741),(137,20,NULL,NULL,'enrolment grade',742),(138,19,NULL,NULL,'enrolment grade',743),(138,21,NULL,NULL,'enrolment grade',744),(139,20,NULL,NULL,'enrolment grade',745),(139,22,NULL,NULL,'enrolment grade',746),(140,21,NULL,NULL,'enrolment grade',747),(140,23,NULL,NULL,'enrolment grade',748),(141,22,NULL,NULL,'enrolment grade',749),(142,23,NULL,NULL,'enrolment grade',750),(142,25,NULL,NULL,'enrolment grade',751),(143,26,NULL,NULL,'enrolment grade',752),(144,25,NULL,NULL,'enrolment grade',753),(144,27,NULL,NULL,'enrolment grade',754),(145,26,NULL,NULL,'enrolment grade',755),(145,19,NULL,NULL,'enrolment grade',756),(146,27,NULL,NULL,'enrolment grade',757),(146,20,NULL,NULL,'enrolment grade',758),(147,19,NULL,NULL,'enrolment grade',759),(147,21,NULL,NULL,'enrolment grade',760),(148,20,NULL,NULL,'enrolment grade',761),(148,22,NULL,NULL,'enrolment grade',762),(149,21,NULL,NULL,'enrolment grade',763),(149,23,NULL,NULL,'enrolment grade',764),(150,22,NULL,NULL,'enrolment grade',765),(151,23,NULL,NULL,'enrolment grade',766),(151,25,NULL,NULL,'enrolment grade',767),(152,26,NULL,NULL,'enrolment grade',768),(153,25,NULL,NULL,'enrolment grade',769),(153,27,NULL,NULL,'enrolment grade',770),(154,26,NULL,NULL,'enrolment grade',771),(154,19,NULL,NULL,'enrolment grade',772),(155,27,NULL,NULL,'enrolment grade',773),(155,20,NULL,NULL,'enrolment grade',774),(156,19,NULL,NULL,'enrolment grade',775),(156,21,NULL,NULL,'enrolment grade',776),(157,20,NULL,NULL,'enrolment grade',777),(157,22,NULL,NULL,'enrolment grade',778),(158,21,NULL,NULL,'enrolment grade',779),(158,23,NULL,NULL,'enrolment grade',780),(159,22,NULL,NULL,'enrolment grade',781),(160,23,NULL,NULL,'enrolment grade',782),(160,25,NULL,NULL,'enrolment grade',783),(161,26,NULL,NULL,'enrolment grade',784),(162,25,NULL,NULL,'enrolment grade',785),(162,27,NULL,NULL,'enrolment grade',786),(163,26,NULL,NULL,'enrolment grade',787),(163,19,NULL,NULL,'enrolment grade',788),(164,27,NULL,NULL,'enrolment grade',789),(164,20,NULL,NULL,'enrolment grade',790),(165,19,NULL,NULL,'enrolment grade',791),(165,21,NULL,NULL,'enrolment grade',792),(166,20,NULL,NULL,'enrolment grade',793),(166,22,NULL,NULL,'enrolment grade',794),(167,21,NULL,NULL,'enrolment grade',795),(167,23,NULL,NULL,'enrolment grade',796),(168,22,NULL,NULL,'enrolment grade',797),(169,23,NULL,NULL,'enrolment grade',798),(169,25,NULL,NULL,'enrolment grade',799),(170,26,NULL,NULL,'enrolment grade',800),(171,25,NULL,NULL,'enrolment grade',801),(171,27,NULL,NULL,'enrolment grade',802),(172,26,NULL,NULL,'enrolment grade',803),(172,19,NULL,NULL,'enrolment grade',804),(173,27,NULL,NULL,'enrolment grade',805),(173,20,NULL,NULL,'enrolment grade',806),(174,19,NULL,NULL,'enrolment grade',807),(174,21,NULL,NULL,'enrolment grade',808),(175,20,NULL,NULL,'enrolment grade',809),(175,22,NULL,NULL,'enrolment grade',810),(176,21,NULL,NULL,'enrolment grade',811),(176,23,NULL,NULL,'enrolment grade',812),(177,22,NULL,NULL,'enrolment grade',813),(178,23,NULL,NULL,'enrolment grade',814),(178,25,NULL,NULL,'enrolment grade',815),(179,26,NULL,NULL,'enrolment grade',816),(180,25,NULL,NULL,'enrolment grade',817),(180,27,NULL,NULL,'enrolment grade',818),(181,26,NULL,NULL,'enrolment grade',819),(181,19,NULL,NULL,'enrolment grade',820),(182,27,NULL,NULL,'enrolment grade',821),(182,20,NULL,NULL,'enrolment grade',822),(183,19,NULL,NULL,'enrolment grade',823),(183,21,NULL,NULL,'enrolment grade',824),(184,20,NULL,NULL,'enrolment grade',825),(184,22,NULL,NULL,'enrolment grade',826),(185,21,NULL,NULL,'enrolment grade',827),(185,23,NULL,NULL,'enrolment grade',828),(186,22,NULL,NULL,'enrolment grade',829),(187,23,NULL,NULL,'enrolment grade',830),(187,25,NULL,NULL,'enrolment grade',831),(188,26,NULL,NULL,'enrolment grade',832),(189,25,NULL,NULL,'enrolment grade',833),(189,27,NULL,NULL,'enrolment grade',834),(190,26,NULL,NULL,'enrolment grade',835),(190,19,NULL,NULL,'enrolment grade',836),(191,27,NULL,NULL,'enrolment grade',837),(191,20,NULL,NULL,'enrolment grade',838),(192,19,NULL,NULL,'enrolment grade',839),(192,21,NULL,NULL,'enrolment grade',840),(193,20,NULL,NULL,'enrolment grade',841),(193,22,NULL,NULL,'enrolment grade',842),(194,21,NULL,NULL,'enrolment grade',843),(194,23,NULL,NULL,'enrolment grade',844),(195,22,NULL,NULL,'enrolment grade',845),(121,25,10,5,'Quiz 2',862),(125,26,35,55,'Midterm',863),(127,26,35,17,'Midterm',864),(145,26,35,28,'Midterm',865),(152,26,35,95,'Midterm',866);
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
  `student_id` int unsigned DEFAULT '0',
  `professor_id` int unsigned DEFAULT '0',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'ahmed@ibu.edu.ba','202cb962ac59075b964b07152d234b70',1,0),(2,'bilal@ibu.edu.ba','202cb962ac59075b964b07152d234b70',4,0),(3,'dino.keco@ibu.edu.ba','202cb962ac59075b964b07152d234b70',0,2),(6,'admin@ibu.edu.ba','202cb962ac59075b964b07152d234b70',0,0),(8,'user@ibu.edu.ba','202cb962ac59075b964b07152d234b70',4,0);
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

-- Dump completed on 2023-09-11  8:59:03
