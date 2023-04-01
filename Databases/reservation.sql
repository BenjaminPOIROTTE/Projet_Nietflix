-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: projet_nietflix
-- ------------------------------------------------------
-- Server version	8.0.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cinema`
--

DROP TABLE IF EXISTS `cinema`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cinema` (
  `id_cinema` int NOT NULL AUTO_INCREMENT,
  `name_cinema` varchar(100) DEFAULT NULL,
  `city_cinema` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_cinema`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cinema`
--

LOCK TABLES `cinema` WRITE;
/*!40000 ALTER TABLE `cinema` DISABLE KEYS */;
INSERT INTO `cinema` VALUES (1,'Kinepolis St Julien','Saint-Julien-lès-Metz');
/*!40000 ALTER TABLE `cinema` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `place`
--

DROP TABLE IF EXISTS `place`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `place` (
  `no_rangee` int NOT NULL,
  `no_col` int NOT NULL,
  `id_salle` int NOT NULL,
  `est_reservee` tinyint DEFAULT NULL,
  PRIMARY KEY (`no_rangee`,`id_salle`,`no_col`),
  KEY `id_salle_idx` (`id_salle`),
  CONSTRAINT `id_salle` FOREIGN KEY (`id_salle`) REFERENCES `salle` (`id_salle`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `place`
--

LOCK TABLES `place` WRITE;
/*!40000 ALTER TABLE `place` DISABLE KEYS */;
INSERT INTO `place` VALUES (0,0,5,1),(0,1,5,1),(0,2,5,0),(0,3,5,1),(0,4,5,0),(0,5,5,0),(0,6,5,0),(0,7,5,0),(0,8,5,0),(0,9,5,0),(0,10,5,0),(0,11,5,1),(0,12,5,0),(0,13,5,0),(1,0,5,1),(1,1,5,0),(1,2,5,0),(1,3,5,0),(1,4,5,0),(1,5,5,0),(1,6,5,0),(1,7,5,0),(1,8,5,0),(1,9,5,0),(1,10,5,0),(1,11,5,0),(1,12,5,1),(1,13,5,1),(2,0,5,0),(2,1,5,0),(2,2,5,0),(2,3,5,0),(2,4,5,0),(2,5,5,0),(2,6,5,0),(2,7,5,0),(2,8,5,0),(2,9,5,0),(2,10,5,0),(2,11,5,0),(2,12,5,0),(2,13,5,0),(3,0,5,0),(3,1,5,0),(3,2,5,0),(3,3,5,0),(3,4,5,0),(3,5,5,0),(3,6,5,0),(3,7,5,0),(3,8,5,0),(3,9,5,0),(3,10,5,0),(3,11,5,0),(3,12,5,0),(3,13,5,0),(4,0,5,0),(4,1,5,0),(4,2,5,0),(4,3,5,0),(4,4,5,0),(4,5,5,0),(4,6,5,0),(4,7,5,0),(4,8,5,0),(4,9,5,0),(4,10,5,0),(4,11,5,0),(4,12,5,0),(4,13,5,0),(5,0,5,0),(5,1,5,0),(5,2,5,0),(5,3,5,0),(5,4,5,0),(5,5,5,0),(5,6,5,0),(5,7,5,0),(5,8,5,0),(5,9,5,0),(5,10,5,0),(5,11,5,0),(5,12,5,0),(5,13,5,0),(6,0,5,0),(6,1,5,0),(6,2,5,0),(6,3,5,0),(6,4,5,0),(6,5,5,0),(6,6,5,0),(6,7,5,0),(6,8,5,0),(6,9,5,0),(6,10,5,0),(6,11,5,0),(6,12,5,0),(6,13,5,0),(7,0,5,0),(7,1,5,0),(7,2,5,0),(7,3,5,0),(7,4,5,0),(7,5,5,0),(7,6,5,0),(7,7,5,0),(7,8,5,0),(7,9,5,0),(7,10,5,0),(7,11,5,0),(7,12,5,0),(7,13,5,0),(8,0,5,0),(8,1,5,0),(8,2,5,0),(8,3,5,0),(8,4,5,0),(8,5,5,0),(8,6,5,0),(8,7,5,0),(8,8,5,0),(8,9,5,0),(8,10,5,0),(8,11,5,0),(8,12,5,0),(8,13,5,0),(9,0,5,0),(9,1,5,1),(9,2,5,0),(9,3,5,0),(9,4,5,0),(9,5,5,0),(9,6,5,0),(9,7,5,0),(9,8,5,0),(9,9,5,0),(9,10,5,0),(9,11,5,0),(9,12,5,0),(9,13,5,0);
/*!40000 ALTER TABLE `place` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `salle`
--

DROP TABLE IF EXISTS `salle`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `salle` (
  `id_salle` int NOT NULL AUTO_INCREMENT,
  `name_salle` varchar(50) DEFAULT NULL,
  `nb_places` int DEFAULT NULL,
  `nb_rangees` int DEFAULT NULL,
  `id_cinema` int DEFAULT NULL,
  PRIMARY KEY (`id_salle`),
  KEY `id_cinema_idx` (`id_cinema`),
  CONSTRAINT `id_cinema` FOREIGN KEY (`id_cinema`) REFERENCES `cinema` (`id_cinema`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `salle`
--

LOCK TABLES `salle` WRITE;
/*!40000 ALTER TABLE `salle` DISABLE KEYS */;
INSERT INTO `salle` VALUES (1,'Salle 1',140,10,1),(2,'Salle 2',140,10,1),(3,'Salle 7',140,14,1),(4,'Salle 2',140,10,1),(5,'Salle 5',140,10,1);
/*!40000 ALTER TABLE `salle` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `insertPlaces` AFTER INSERT ON `salle` FOR EACH ROW BEGIN
	DECLARE v_i INT DEFAULT 0;
	DECLARE v_y INT DEFAULT 0;
	SET v_i=0;
	SET v_y=0;
	WHILE v_i<NEW.nb_rangees DO
    	WHILE v_y<(NEW.nb_places/NEW.nb_rangees) DO
    		INSERT INTO Place(no_rangee,no_col,id_salle,est_reservee) VALUES(v_i,v_y,NEW.id_salle,0);
        	SET v_y=v_y+1;
    	END WHILE;
        SET v_y=0;
    	SET v_i=v_i+1;
	END WHILE;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-04-01 17:20:00
