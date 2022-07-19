/*
 Navicat Premium Data Transfer

 Source Server         : WebProgrammer
 Source Server Type    : MySQL
 Source Server Version : 50734
 Source Host           : localhost:3306
 Source Schema         : systeminformationsystem

 Target Server Type    : MySQL
 Target Server Version : 50734
 File Encoding         : 65001

 Date: 19/07/2022 22:11:57
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for course
-- ----------------------------
DROP TABLE IF EXISTS `course`;
CREATE TABLE `course`  (
  `id` int(40) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `description` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `professor_id` int(40) UNSIGNED NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `professor`(`professor_id`) USING BTREE,
  CONSTRAINT `professor` FOREIGN KEY (`professor_id`) REFERENCES `professor` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of course
-- ----------------------------
INSERT INTO `course` VALUES (1, 'Calculus II', 'Second installment of calculus', 5);
INSERT INTO `course` VALUES (2, 'Calculus I', 'Math basics', 5);
INSERT INTO `course` VALUES (3, 'Intro to Web ', 'Basics of Web Development', 2);
INSERT INTO `course` VALUES (4, 'Intro to Mobile', 'Mobile programming - Android Studio / Java', 2);
INSERT INTO `course` VALUES (5, 'Discrete Maths', 'Intermediatery mathematics, including cryptography', 2);
INSERT INTO `course` VALUES (6, 'Database Design', 'Intermediary course on database theory and MySQL', 1);

-- ----------------------------
-- Table structure for notification
-- ----------------------------
DROP TABLE IF EXISTS `notification`;
CREATE TABLE `notification`  (
  `id` int(40) UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `description` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `created_at` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of notification
-- ----------------------------
INSERT INTO `notification` VALUES (1, 'Regarding exam registration', 'Dear Students, on the LMS you can find a video tutorial on how to register for your exams. Please be aware that students will not be able to do exams that they haven\'t previously registered for.', '2022-07-12 15:39:48');
INSERT INTO `notification` VALUES (2, 'Happy Holidays', 'The staff of the University wishes you happy holidays. We hope to see you soon!', '2022-07-17 15:17:33');
INSERT INTO `notification` VALUES (3, 'Erasmus Information', 'Information about upcoming erasmus programs will be available on our website. Be sure to check it regularly.', '2022-07-17 15:21:01');

-- ----------------------------
-- Table structure for professor
-- ----------------------------
DROP TABLE IF EXISTS `professor`;
CREATE TABLE `professor`  (
  `id` int(40) UNSIGNED NOT NULL AUTO_INCREMENT,
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `fullname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `phone` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `dateofbirth` date NULL DEFAULT NULL,
  `gender` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of professor
-- ----------------------------
INSERT INTO `professor` VALUES (1, 'dzelilam@gmail.com', 'Dzelila Mehanovic', '061827455', '1990-12-12', 'Female');
INSERT INTO `professor` VALUES (2, 'dinokeco@ibu.edu.ba', 'Dino Keco', '062234123', '1973-04-12', 'Male');
INSERT INTO `professor` VALUES (4, 'elma.avdic@ibu.edu.ba', 'Elma Avdic', '061332412', '1975-04-01', 'Female');
INSERT INTO `professor` VALUES (5, 'saidasultanic@stu.ibu.edu.ba', 'Saida Sultanic', '062445611', '1967-02-07', 'Female');
INSERT INTO `professor` VALUES (7, 'becirisakovic@ibu.edu.ba', 'Becir Isakovic', '06222435', '1996-06-09', 'male');

-- ----------------------------
-- Table structure for student
-- ----------------------------
DROP TABLE IF EXISTS `student`;
CREATE TABLE `student`  (
  `id` int(40) UNSIGNED NOT NULL AUTO_INCREMENT,
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `fullname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `phone` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `gender` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of student
-- ----------------------------
INSERT INTO `student` VALUES (1, 'ahmed.durakovic@gmail.ba', 'Ahmed Durakovic', '1231231231', 'Male');
INSERT INTO `student` VALUES (2, 'melisa22@gmail.com', 'Melisa Brulic', '44', 'female');
INSERT INTO `student` VALUES (3, 'merisa4@gmai.com', 'Merisa Brrulic', '4122', 'female');
INSERT INTO `student` VALUES (4, 'bilal.durakovic@stu.ibu.edu.ba', 'Bilal Durakovic', '062030834', 'male');
INSERT INTO `student` VALUES (5, 'farisrizvanovic@gmail.com', 'Faris Rizvanovic', '322412', 'male');

-- ----------------------------
-- Table structure for student_courses
-- ----------------------------
DROP TABLE IF EXISTS `student_courses`;
CREATE TABLE `student_courses`  (
  `student_id` int(40) UNSIGNED NOT NULL,
  `course_id` int(40) UNSIGNED NOT NULL,
  `percentage_total_amount` int(40) NULL DEFAULT NULL,
  `percentage_acquired` int(40) NULL DEFAULT NULL,
  `grade_title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `id` int(40) UNSIGNED NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `course`(`course_id`) USING BTREE,
  INDEX `student`(`student_id`) USING BTREE,
  CONSTRAINT `course` FOREIGN KEY (`course_id`) REFERENCES `course` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `student` FOREIGN KEY (`student_id`) REFERENCES `student` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of student_courses
-- ----------------------------
INSERT INTO `student_courses` VALUES (1, 2, 30, 60, 'Midterm Exam', 1);
INSERT INTO `student_courses` VALUES (1, 2, 40, 75, 'Project', 2);
INSERT INTO `student_courses` VALUES (1, 2, 30, 55, 'Final', 3);
INSERT INTO `student_courses` VALUES (1, 3, 10, 100, 'Quiz 1', 4);
INSERT INTO `student_courses` VALUES (1, 1, 5, 40, 'Quiz 1', 7);

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `student_id` int(40) UNSIGNED NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, 'admin@ibu.edu.ba', '202cb962ac59075b964b07152d234b70', NULL);

SET FOREIGN_KEY_CHECKS = 1;
