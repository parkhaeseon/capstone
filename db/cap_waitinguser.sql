-- MySQL dump 10.13  Distrib 8.0.16, for Win64 (x86_64)
--
-- Host: localhost    Database: cap
-- ------------------------------------------------------
-- Server version	8.0.15

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `waitinguser`
--

DROP TABLE IF EXISTS `waitinguser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
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
INSERT INTO `waitinguser` VALUES ('14011174','20191101130001',1,1),('14011187','20191101130001',2,1),('14011187','20191101130002',4,2),('rldjq','20191101130002',3,2);
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

-- Dump completed on 2019-11-15 15:30:52
