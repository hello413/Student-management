-- MySQL dump 10.13  Distrib 8.0.16, for Win64 (x86_64)
--
-- Host: localhost    Database: user_table
-- ------------------------------------------------------
-- Server version	8.0.16

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8mb4 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `administrators`
--

DROP TABLE IF EXISTS `administrators`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `administrators` (
  `administrators_num` varchar(5) DEFAULT NULL,
  `administrators_pass` varchar(5) DEFAULT NULL,
  UNIQUE KEY `administrators_password_UNIQUE` (`administrators_pass`),
  UNIQUE KEY `administrators_number_UNIQUE` (`administrators_num`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `administrators`
--

LOCK TABLES `administrators` WRITE;
/*!40000 ALTER TABLE `administrators` DISABLE KEYS */;
INSERT INTO `administrators` VALUES ('11111','11111');
/*!40000 ALTER TABLE `administrators` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `allowance`
--

DROP TABLE IF EXISTS `allowance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `allowance` (
  `allowance1` int(11) NOT NULL,
  `allowance2` int(11) NOT NULL,
  `allowance3` int(11) NOT NULL,
  `allowance4` int(11) NOT NULL,
  `allowance5` int(11) NOT NULL,
  `allowance6` int(11) NOT NULL,
  `allowance7` int(11) NOT NULL,
  `allowance8` int(11) NOT NULL,
  `allowance9` int(11) NOT NULL,
  `allowance10` int(11) NOT NULL,
  `allowance11` int(11) NOT NULL,
  `allowance12` int(11) NOT NULL,
  UNIQUE KEY `allowance1_UNIQUE` (`allowance1`),
  UNIQUE KEY `allowance2_UNIQUE` (`allowance2`),
  UNIQUE KEY `allowance3_UNIQUE` (`allowance3`),
  UNIQUE KEY `allowance4_UNIQUE` (`allowance4`),
  UNIQUE KEY `allowance5_UNIQUE` (`allowance5`),
  UNIQUE KEY `allowance6_UNIQUE` (`allowance6`),
  UNIQUE KEY `allowance7_UNIQUE` (`allowance7`),
  UNIQUE KEY `allowance8_UNIQUE` (`allowance8`),
  UNIQUE KEY `allowance9_UNIQUE` (`allowance9`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `allowance`
--

LOCK TABLES `allowance` WRITE;
/*!40000 ALTER TABLE `allowance` DISABLE KEYS */;
INSERT INTO `allowance` VALUES (0,0,0,4,5,6,3,6,7,1,2,2);
/*!40000 ALTER TABLE `allowance` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student`
--

DROP TABLE IF EXISTS `student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `student` (
  `学号` varchar(45) NOT NULL,
  `姓名` varchar(45) NOT NULL,
  `年级` varchar(45) NOT NULL,
  `性别` varchar(45) NOT NULL,
  `竞赛信息` varchar(45) NOT NULL,
  `获奖情况` varchar(45) NOT NULL,
  `专业` varchar(45) NOT NULL,
  `班级` varchar(45) NOT NULL,
  `出生日期` varchar(45) NOT NULL,
  `联系电话` varchar(45) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `密码` varchar(45) DEFAULT NULL,
  `机房预约` varchar(45) DEFAULT NULL,
  `心理预约` varchar(45) DEFAULT NULL,
  `活动预约` varchar(45) DEFAULT NULL,
  `教室预约` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student`
--

LOCK TABLES `student` WRITE;
/*!40000 ALTER TABLE `student` DISABLE KEYS */;
INSERT INTO `student` VALUES ('41700010120','蔡徐坤','17','','是','否','软件工程','2','1995-5-1','13082754651',29,NULL,'7号楼1号机房	2019.4.9 8:00-10:00','李四老师, 时间:每周五17:00-19:00	 地点:2号心理辅导室','食堂义工 时间:2019.4.2 10:00-12:00	地点:学校新食堂','C428教室  时间:2019.6.2 14:00-16:00'),('41700010120','蔡徐坤','17','','是','否','软件工程','2','1995-5-1','13082754651',30,'12345','7号楼1号机房	2019.4.9 8:00-10:00','李四老师, 时间:每周五17:00-19:00	 地点:2号心理辅导室','食堂义工 时间:2019.4.2 10:00-12:00	地点:学校新食堂','C428教室  时间:2019.6.2 14:00-16:00'),('41700010120','蔡徐坤','17','','是','否','软件工程','2','1995-5-1','13082754651',31,'12345','7号楼1号机房	2019.4.9 8:00-10:00','李四老师, 时间:每周五17:00-19:00	 地点:2号心理辅导室','食堂义工 时间:2019.4.2 10:00-12:00	地点:学校新食堂','C428教室  时间:2019.6.2 14:00-16:00'),('41700010120','蔡徐坤','17','','是','否','软件工程','2','1995-5-1','13082754651',32,NULL,'7号楼1号机房	2019.4.9 8:00-10:00',NULL,'食堂义工 时间:2019.4.2 10:00-12:00	地点:学校新食堂','C428教室  时间:2019.6.2 14:00-16:00'),('41700010120','蔡徐坤','17','','是','否','软件工程','2','1995-5-1','13082754651',33,'12345','7号楼1号机房	2019.4.9 8:00-10:00','0','食堂义工 时间:2019.4.2 10:00-12:00	地点:学校新食堂','C428教室  时间:2019.6.2 14:00-16:00'),('41700010120','蔡徐坤','17','','是','否','软件工程','2','1995-5-1','13082754651',34,'12345','7号楼1号机房	2019.4.9 8:00-10:00','0','食堂义工 时间:2019.4.2 10:00-12:00	地点:学校新食堂','C428教室  时间:2019.6.2 14:00-16:00'),('41700010120','蔡徐坤','17','','是','否','软件工程','2','1995-5-1','13082754651',35,'123','7号楼1号机房	2019.4.9 8:00-10:00','0','食堂义工 时间:2019.4.2 10:00-12:00	地点:学校新食堂','C428教室  时间:2019.6.2 14:00-16:00'),('41700010120','蔡徐坤','17','','是','否','软件工程','2','1995-5-1','13082754651',36,'123','7号楼1号机房	2019.4.9 8:00-10:00','0','食堂义工 时间:2019.4.2 10:00-12:00	地点:学校新食堂','C428教室  时间:2019.6.2 14:00-16:00'),('41700010120','蔡徐坤','17','','是','否','软件工程','2','1995-5-1','13082754651',37,NULL,'7号楼1号机房	2019.4.9 8:00-10:00',NULL,'食堂义工 时间:2019.4.2 10:00-12:00	地点:学校新食堂','C428教室  时间:2019.6.2 14:00-16:00'),('41700010113','妈和那个','安达市的','男','大叔大婶','大舍大得','软件工程','1','1995-1-1','13113131313',38,'123123123','7号楼1号机房	2019.4.9 8:00-10:00','0','食堂义工 时间:2019.4.2 10:00-12:00	地点:学校新食堂','C428教室  时间:2019.6.2 14:00-16:00'),('41700010129','老田','17','男','是','是','软件工程','1','1995-1-1','13619278232',39,'12345','7号楼1号机房	2019.4.9 8:00-10:00','0','食堂义工 时间:2019.4.2 10:00-12:00	地点:学校新食堂','C428教室  时间:2019.6.2 14:00-16:00'),('41700010121','却无法','让他','男',' 让他',' 突然','计算机科学与技术','1','1995-1-1','13274845978',40,NULL,'7号楼1号机房	2019.4.9 8:00-10:00',NULL,'食堂义工 时间:2019.4.2 10:00-12:00	地点:学校新食堂','C428教室  时间:2019.6.2 14:00-16:00'),('41700010121','却无法','让他','',' 让他',' 突然','计算机科学与技术','1','1995-1-1','13274845978',41,NULL,'7号楼1号机房	2019.4.9 8:00-10:00',NULL,'食堂义工 时间:2019.4.2 10:00-12:00	地点:学校新食堂','C428教室  时间:2019.6.2 14:00-16:00'),('41700010118','他如何如何','17','男','我去','跟我','软件工程','1','1995-1-1','13279166808',42,'gerge','7号楼1号机房	2019.4.9 8:00-10:00','0','食堂义工 时间:2019.4.2 10:00-12:00	地点:学校新食堂','C428教室  时间:2019.6.2 14:00-16:00'),('41700010111','热狗','17','男','是','是','软件工程','1','1995-1-1','13279166808',44,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `student` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `user` (
  `username` varchar(45) NOT NULL,
  `sno` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('王尼玛','41700020120');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-06-13 10:12:55
