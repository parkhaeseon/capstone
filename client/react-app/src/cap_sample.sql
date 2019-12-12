-- MySQL dump 10.13  Distrib 5.7.28, for Linux (x86_64)
--
-- Host: localhost    Database: cap
-- ------------------------------------------------------
-- Server version	5.7.28-0ubuntu0.18.04.4

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `classtype`
--

DROP TABLE IF EXISTS `classtype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `classtype` (
  `classlevel` int(11) NOT NULL,
  `classname` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`classlevel`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `classtype`
--

LOCK TABLES `classtype` WRITE;
/*!40000 ALTER TABLE `classtype` DISABLE KEYS */;
INSERT INTO `classtype` VALUES (1,'관리자'),(2,'기업'),(3,'교수'),(4,'학생');
/*!40000 ALTER TABLE `classtype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `penalty`
--

DROP TABLE IF EXISTS `penalty`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `penalty` (
  `penaltycode` varchar(40) COLLATE utf8mb4_unicode_ci NOT NULL,
  `datestart` datetime NOT NULL,
  `dateend` datetime NOT NULL,
  `penaltynumber` int(11) NOT NULL,
  PRIMARY KEY (`penaltycode`),
  KEY `FK_penalty_penaltynumber_penaltytype_penaltynumber` (`penaltynumber`),
  CONSTRAINT `FK_penalty_penaltynumber_penaltytype_penaltynumber` FOREIGN KEY (`penaltynumber`) REFERENCES `penaltytype` (`penaltynumber`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `penalty`
--

LOCK TABLES `penalty` WRITE;
/*!40000 ALTER TABLE `penalty` DISABLE KEYS */;
INSERT INTO `penalty` VALUES ('1','2019-10-01 00:00:00','2019-10-14 00:00:00',1),('2','2019-10-01 00:00:00','2019-10-14 00:00:00',2),('3','2019-11-20 00:00:00','2019-12-30 00:00:00',1);
/*!40000 ALTER TABLE `penalty` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `penaltylist`
--

DROP TABLE IF EXISTS `penaltylist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `penaltylist` (
  `id` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `penaltycode` varchar(40) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`,`penaltycode`),
  KEY `FK_penaltylist_penaltycode_penalty_penaltycode` (`penaltycode`),
  CONSTRAINT `FK_penaltylist_id_user_id` FOREIGN KEY (`id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_penaltylist_penaltycode_penalty_penaltycode` FOREIGN KEY (`penaltycode`) REFERENCES `penalty` (`penaltycode`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `penaltylist`
--

LOCK TABLES `penaltylist` WRITE;
/*!40000 ALTER TABLE `penaltylist` DISABLE KEYS */;
INSERT INTO `penaltylist` VALUES ('14011173','1'),('rldjq','2'),('999','3');
/*!40000 ALTER TABLE `penaltylist` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `penaltytype`
--

DROP TABLE IF EXISTS `penaltytype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `penaltytype` (
  `penaltynumber` int(11) NOT NULL,
  `penaltyname` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `penaltydate` int(11) NOT NULL,
  PRIMARY KEY (`penaltynumber`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `penaltytype`
--

LOCK TABLES `penaltytype` WRITE;
/*!40000 ALTER TABLE `penaltytype` DISABLE KEYS */;
INSERT INTO `penaltytype` VALUES (1,'기물파손',14),(2,'노쇼',14),(3,'기타',7);
/*!40000 ALTER TABLE `penaltytype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reservation`
--

DROP TABLE IF EXISTS `reservation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `reservation` (
  `reservationcode` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `datestart` datetime NOT NULL,
  `dateend` datetime NOT NULL,
  `roomnumber` int(11) NOT NULL,
  `reason` text COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`reservationcode`),
  KEY `FK_reservation_roomnumber_roomtype_roomnumber` (`roomnumber`),
  CONSTRAINT `FK_reservation_roomnumber_roomtype_roomnumber` FOREIGN KEY (`roomnumber`) REFERENCES `roomtype` (`roomnumber`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservation`
--

LOCK TABLES `reservation` WRITE;
/*!40000 ALTER TABLE `reservation` DISABLE KEYS */;
INSERT INTO `reservation` VALUES ('2019120215001','2019-12-02 15:00:00','2019-12-02 16:00:00',1,'대기 테스트');
/*!40000 ALTER TABLE `reservation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reservationlist`
--

DROP TABLE IF EXISTS `reservationlist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `reservationlist` (
  `id` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `reservationcode` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`,`reservationcode`),
  KEY `FK_reservationlist_reservationcode_reservation_reservationcode` (`reservationcode`),
  CONSTRAINT `FK1` FOREIGN KEY (`id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_reservationlist_reservationcode_reservation_reservationcode` FOREIGN KEY (`reservationcode`) REFERENCES `reservation` (`reservationcode`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservationlist`
--

LOCK TABLES `reservationlist` WRITE;
/*!40000 ALTER TABLE `reservationlist` DISABLE KEYS */;
INSERT INTO `reservationlist` VALUES ('14011106','2019120215001'),('14011107','2019120215001'),('14011108','2019120215001'),('14011109','2019120215001'),('14011110','2019120215001');
/*!40000 ALTER TABLE `reservationlist` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roommng`
--

DROP TABLE IF EXISTS `roommng`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `roommng` (
  `roomnumber` int(11) NOT NULL,
  `sit` int(11) NOT NULL,
  PRIMARY KEY (`roomnumber`),
  CONSTRAINT `roommng_ibfk_1` FOREIGN KEY (`roomnumber`) REFERENCES `roomtype` (`roomnumber`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roommng`
--

LOCK TABLES `roommng` WRITE;
/*!40000 ALTER TABLE `roommng` DISABLE KEYS */;
INSERT INTO `roommng` VALUES (1,1),(2,1),(3,1),(4,0),(5,1),(6,0),(7,1);
/*!40000 ALTER TABLE `roommng` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roomtype`
--

DROP TABLE IF EXISTS `roomtype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `roomtype` (
  `roomnumber` int(11) NOT NULL,
  `roomname` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`roomnumber`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roomtype`
--

LOCK TABLES `roomtype` WRITE;
/*!40000 ALTER TABLE `roomtype` DISABLE KEYS */;
INSERT INTO `roomtype` VALUES (1,'Talk1'),(2,'Talk2'),(3,'Talk3'),(4,'3D Printer Room'),(5,'VR Room'),(6,'Visual Studio'),(7,'Maker\'s Workshop');
/*!40000 ALTER TABLE `roomtype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `classlevel` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_user_classlevel_classtype_classlevel` (`classlevel`),
  CONSTRAINT `FK_user_classlevel_classtype_classlevel` FOREIGN KEY (`classlevel`) REFERENCES `classtype` (`classlevel`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('14011101','123','김학생',4),('14011102','123','최학생',4),('14011103','123','이학생',4),('14011104','123','박학생',4),('14011105','123','학생05',4),('14011106','123','학생06',4),('14011107','123','학생07',4),('14011108','123','학생08',4),('14011109','123','학생09',4),('14011110','123','학생10',4),('14011169','qkrgotjs','박해선',1),('14011173','tjwnstjr','서준석',4),('14011174','thsdmfdud','손을영',4),('14011187','dlrudtn','이경수',4),('999','123','김제재',4),('rldjq','rldjq','기업',2);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `waitinglist`
--

DROP TABLE IF EXISTS `waitinglist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `waitinglist` (
  `roomnumber` int(11) NOT NULL,
  `reservationcode` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `autonumber` int(11) NOT NULL AUTO_INCREMENT,
  `datestart` datetime NOT NULL,
  `reason` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `classlevel` int(11) NOT NULL,
  PRIMARY KEY (`autonumber`),
  KEY `FK_waitinglist_classlevel_classtype_classlevel` (`classlevel`),
  KEY `FK_waitinglist_roomnumber_roomtype_roomnumber` (`roomnumber`),
  CONSTRAINT `FK_waitinglist_classlevel_classtype_classlevel` FOREIGN KEY (`classlevel`) REFERENCES `classtype` (`classlevel`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_waitinglist_roomnumber_roomtype_roomnumber` FOREIGN KEY (`roomnumber`) REFERENCES `roomtype` (`roomnumber`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `waitinglist`
--

LOCK TABLES `waitinglist` WRITE;
/*!40000 ALTER TABLE `waitinglist` DISABLE KEYS */;
/*!40000 ALTER TABLE `waitinglist` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `waitinguser`
--

DROP TABLE IF EXISTS `waitinguser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `waitinguser` (
  `id` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `reservationcode` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `autonumber` int(11) NOT NULL,
  `roomnumber` int(11) NOT NULL,
  PRIMARY KEY (`id`,`reservationcode`),
  KEY `FK_waitinguser_reservationcode_waitinglist_reservationcode` (`autonumber`),
  KEY `FK_waitinguser_roomnumber_roomtype_roomnumber` (`roomnumber`),
  CONSTRAINT `FK_waitinguser_id_user_id` FOREIGN KEY (`id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_waitinguser_reservationcode_waitinglist_reservationcode` FOREIGN KEY (`autonumber`) REFERENCES `waitinglist` (`autonumber`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_waitinguser_roomnumber_roomtype_roomnumber` FOREIGN KEY (`roomnumber`) REFERENCES `roomtype` (`roomnumber`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `waitinguser`
--

LOCK TABLES `waitinguser` WRITE;
/*!40000 ALTER TABLE `waitinguser` DISABLE KEYS */;
/*!40000 ALTER TABLE `waitinguser` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-12-02  7:41:02
