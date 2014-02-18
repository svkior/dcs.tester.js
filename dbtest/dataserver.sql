-- MySQL dump 10.13  Distrib 5.5.35, for debian-linux-gnu (i686)
--
-- Host: localhost    Database: dataserver
-- ------------------------------------------------------
-- Server version	5.5.35-0+wheezy1

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
-- Table structure for table `ColorTable`
--

DROP TABLE IF EXISTS `ColorTable`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ColorTable` (
  `index` int(11) NOT NULL,
  `R` int(11) DEFAULT NULL,
  `G` int(11) DEFAULT NULL,
  `B` int(11) DEFAULT NULL,
  `A` int(11) DEFAULT NULL,
  `description` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`index`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ColorTable`
--

LOCK TABLES `ColorTable` WRITE;
/*!40000 ALTER TABLE `ColorTable` DISABLE KEYS */;
/*!40000 ALTER TABLE `ColorTable` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `DecorationMetadata`
--

DROP TABLE IF EXISTS `DecorationMetadata`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `DecorationMetadata` (
  `idDecorationMetadata` int(11) NOT NULL,
  `unitID` int(11) DEFAULT NULL,
  `disabled` int(11) DEFAULT NULL,
  `unitCount` int(11) DEFAULT NULL,
  `PlanID` int(11) DEFAULT NULL,
  `decorationID` int(11) DEFAULT NULL,
  PRIMARY KEY (`idDecorationMetadata`),
  KEY `fk_DecorationMetadata_PlanMetadata1` (`PlanID`),
  CONSTRAINT `fk_DecorationMetadata_PlanMetadata1` FOREIGN KEY (`PlanID`) REFERENCES `PlanMetadata` (`idPlanMetadata`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `DecorationMetadata`
--

LOCK TABLES `DecorationMetadata` WRITE;
/*!40000 ALTER TABLE `DecorationMetadata` DISABLE KEYS */;
/*!40000 ALTER TABLE `DecorationMetadata` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Frame`
--

DROP TABLE IF EXISTS `Frame`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Frame` (
  `ID` int(11) NOT NULL,
  `BoundLeft` double DEFAULT NULL,
  `BoundTop` double DEFAULT NULL,
  `BoundWidth` double DEFAULT NULL,
  `BoundHeigth` double DEFAULT NULL,
  `PlanID` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `fk_Frame_Plan1` (`PlanID`),
  CONSTRAINT `fk_Frame_Plan1` FOREIGN KEY (`PlanID`) REFERENCES `Plan` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Frame`
--

LOCK TABLES `Frame` WRITE;
/*!40000 ALTER TABLE `Frame` DISABLE KEYS */;
/*!40000 ALTER TABLE `Frame` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `GraphObject`
--

DROP TABLE IF EXISTS `GraphObject`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `GraphObject` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `BoundLeft` double DEFAULT NULL,
  `BoundTop` double DEFAULT NULL,
  `BoundWidth` double DEFAULT NULL,
  `BoundHeight` double DEFAULT NULL,
  `GraphicObjectType` int(11) DEFAULT NULL,
  `PenColorID` int(11) DEFAULT NULL,
  `BrushColorID` int(11) DEFAULT NULL,
  `GraphicObjectLineStyle` int(11) DEFAULT NULL,
  `LineWeigth` int(11) DEFAULT NULL,
  `FontSize` int(11) DEFAULT NULL,
  `DecorationID` int(11) DEFAULT NULL,
  `FrameID` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `fk_GraphObject_Frame` (`FrameID`),
  CONSTRAINT `fk_GraphObject_Frame` FOREIGN KEY (`FrameID`) REFERENCES `Frame` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `GraphObject`
--

LOCK TABLES `GraphObject` WRITE;
/*!40000 ALTER TABLE `GraphObject` DISABLE KEYS */;
/*!40000 ALTER TABLE `GraphObject` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Plan`
--

DROP TABLE IF EXISTS `Plan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Plan` (
  `ID` int(11) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Plan`
--

LOCK TABLES `Plan` WRITE;
/*!40000 ALTER TABLE `Plan` DISABLE KEYS */;
/*!40000 ALTER TABLE `Plan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PlanMetadata`
--

DROP TABLE IF EXISTS `PlanMetadata`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `PlanMetadata` (
  `idPlanMetadata` int(11) NOT NULL,
  `unitsInLine` int(11) DEFAULT NULL,
  `linesCount` int(11) DEFAULT NULL,
  `planName` varchar(256) DEFAULT NULL,
  `idPult` int(11) DEFAULT NULL,
  PRIMARY KEY (`idPlanMetadata`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PlanMetadata`
--

LOCK TABLES `PlanMetadata` WRITE;
/*!40000 ALTER TABLE `PlanMetadata` DISABLE KEYS */;
/*!40000 ALTER TABLE `PlanMetadata` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `connections`
--

DROP TABLE IF EXISTS `connections`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `connections` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `MT` int(11) NOT NULL,
  `Device` varchar(256) NOT NULL,
  `Type` varchar(256) NOT NULL,
  `Param` int(11) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `connections`
--

LOCK TABLES `connections` WRITE;
/*!40000 ALTER TABLE `connections` DISABLE KEYS */;
INSERT INTO `connections` VALUES (1,1,'','HWCTRLSRV',0),(2,1,'','HWCTRLSRV',0),(3,1,'','HWCTRLSRV',8),(4,1,'','HWCTRLSRV',8),(5,1,'','HWCTRLSRV',8),(6,1,'','HWCTRLSRV',8),(7,1,'','HWCTRLSRV',10),(8,1,'','HWCTRLSRV',10),(9,1,'','HWCTRLSRV',0),(10,1,'','HWCTRLSRV',0),(11,1,'','HWCTRLSRV',8),(12,1,'','HWCTRLSRV',8),(13,1,'','HWCTRLSRV',524296),(14,1,'','HWCTRLSRV',524296),(15,1,'','HWCTRLSRV',0),(16,1,'','HWCTRLSRV',0),(17,1,'','HWCTRLSRV',1),(18,1,'','HWCTRLSRV',1),(19,1,'','HWCTRLSRV',65536),(20,1,'','HWCTRLSRV',65536),(21,1,'','HWCTRLSRV',3),(22,1,'','HWCTRLSRV',3);
/*!40000 ALTER TABLE `connections` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `decorations`
--

DROP TABLE IF EXISTS `decorations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `decorations` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `MT` int(11) NOT NULL,
  `Caption` varchar(256) NOT NULL,
  `Comment` varchar(256) NOT NULL,
  `Path` varchar(256) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `decorations`
--

LOCK TABLES `decorations` WRITE;
/*!40000 ALTER TABLE `decorations` DISABLE KEYS */;
INSERT INTO `decorations` VALUES (1,1,'круг','',''),(2,1,'кольцо','',''),(3,1,'круг-кольцо два двигателя в группе','',''),(4,1,'круг-кольцо две группы','',''),(5,1,'sofit1','','');
/*!40000 ALTER TABLE `decorations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `decprf`
--

DROP TABLE IF EXISTS `decprf`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `decprf` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `MT` int(11) NOT NULL,
  `PerformID` int(11) NOT NULL,
  `DecorationID` int(11) NOT NULL,
  `Invert` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `dpDecorationIndex` (`DecorationID`),
  KEY `gdPerformIndex` (`PerformID`),
  CONSTRAINT `decprf_ibfk_1` FOREIGN KEY (`DecorationID`) REFERENCES `decorations` (`ID`) ON DELETE CASCADE,
  CONSTRAINT `decprf_ibfk_2` FOREIGN KEY (`PerformID`) REFERENCES `performs` (`ID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `decprf`
--

LOCK TABLES `decprf` WRITE;
/*!40000 ALTER TABLE `decprf` DISABLE KEYS */;
INSERT INTO `decprf` VALUES (47,0,3,1,-1230925290),(53,0,4,1,147284920),(58,0,2,1,48210454),(61,0,5,5,1),(63,0,6,5,1);
/*!40000 ALTER TABLE `decprf` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `drives`
--

DROP TABLE IF EXISTS `drives`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `drives` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `MT` int(11) NOT NULL,
  `ConnectionID` int(11) DEFAULT NULL,
  `PrimaryID` int(11) NOT NULL,
  `Comment` varchar(256) NOT NULL,
  `IP` int(11) NOT NULL,
  `CP` varchar(256) NOT NULL,
  `D1` double NOT NULL,
  `D2` double NOT NULL,
  `D3` double NOT NULL,
  `D4` double NOT NULL,
  `D5` double NOT NULL,
  `D6` double NOT NULL,
  `D7` double NOT NULL,
  `D8` double NOT NULL,
  `D9` double NOT NULL,
  `D10` double NOT NULL,
  `D11` double NOT NULL,
  `D12` double NOT NULL,
  `D13` double NOT NULL,
  `D14` double NOT NULL,
  `D15` double NOT NULL,
  `D16` double NOT NULL,
  `D17` double NOT NULL,
  `D18` double NOT NULL,
  `D19` double NOT NULL,
  `D20` double NOT NULL,
  `D21` double NOT NULL,
  `D22` double NOT NULL,
  `sp_k1` double NOT NULL DEFAULT '0',
  `sp_k2` double NOT NULL DEFAULT '0',
  `sp_k3` double NOT NULL DEFAULT '0',
  `sp_k4` double NOT NULL DEFAULT '0',
  `sp_invk1` double NOT NULL DEFAULT '0',
  `sp_invk2` double NOT NULL DEFAULT '0',
  `sp_invk3` double NOT NULL DEFAULT '0',
  `sp_invk4` double NOT NULL DEFAULT '0',
  PRIMARY KEY (`ID`),
  KEY `ConnectionIDIndex` (`ConnectionID`),
  CONSTRAINT `drives_ibfk_1` FOREIGN KEY (`ConnectionID`) REFERENCES `connections` (`ID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `drives`
--

LOCK TABLES `drives` WRITE;
/*!40000 ALTER TABLE `drives` DISABLE KEYS */;
INSERT INTO `drives` VALUES (6,1,17,0,'ШУ-2',0,'HWCTRLSRV',1,0,0,1,0,0,0,0,0,-200000,200000,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0),(7,1,19,0,'sofit',0,'HWCTRLSRV',150,0,0,0,0,1,0,0,0,-200000,200000,0,1160,0,0,0,0,0,4684969,0,0,0,0,0,0,0,0,0,0,0),(8,1,21,0,'sofiT2',0,'HWCTRLSRV',1,0,0,0,0,1,0,0,0,-200000,200000,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0);
/*!40000 ALTER TABLE `drives` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `drivesInPlan`
--

DROP TABLE IF EXISTS `drivesInPlan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `drivesInPlan` (
  `planID` int(11) NOT NULL,
  `driveID` int(11) NOT NULL,
  KEY `planIndex` (`planID`),
  KEY `drvIndex` (`driveID`),
  CONSTRAINT `drivesInPlan_ibfk_1` FOREIGN KEY (`planID`) REFERENCES `plans` (`id`) ON DELETE CASCADE,
  CONSTRAINT `drivesInPlan_ibfk_2` FOREIGN KEY (`driveID`) REFERENCES `drives` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `drivesInPlan`
--

LOCK TABLES `drivesInPlan` WRITE;
/*!40000 ALTER TABLE `drivesInPlan` DISABLE KEYS */;
/*!40000 ALTER TABLE `drivesInPlan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `drvgrp`
--

DROP TABLE IF EXISTS `drvgrp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `drvgrp` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `MT` int(11) NOT NULL,
  `GroupID` int(11) NOT NULL,
  `DriveID` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `dgGrpIndex` (`GroupID`),
  KEY `dgDrvIndex` (`DriveID`),
  CONSTRAINT `drvgrp_ibfk_1` FOREIGN KEY (`GroupID`) REFERENCES `groups` (`ID`) ON DELETE CASCADE,
  CONSTRAINT `drvgrp_ibfk_2` FOREIGN KEY (`DriveID`) REFERENCES `drives` (`ID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `drvgrp`
--

LOCK TABLES `drvgrp` WRITE;
/*!40000 ALTER TABLE `drvgrp` DISABLE KEYS */;
INSERT INTO `drvgrp` VALUES (6,1,3,6),(16,1,5,8),(21,1,4,7);
/*!40000 ALTER TABLE `drvgrp` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gears`
--

DROP TABLE IF EXISTS `gears`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gears` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `MT` int(11) NOT NULL,
  `DriveID` int(11) NOT NULL,
  `Number` int(11) NOT NULL,
  `Factor` double NOT NULL,
  `Transport` int(11) NOT NULL,
  `D1` int(11) NOT NULL,
  `D2` int(11) NOT NULL,
  `D3` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `gearsDriveIndex` (`DriveID`),
  CONSTRAINT `gears_ibfk_1` FOREIGN KEY (`DriveID`) REFERENCES `drives` (`ID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gears`
--

LOCK TABLES `gears` WRITE;
/*!40000 ALTER TABLE `gears` DISABLE KEYS */;
INSERT INTO `gears` VALUES (6,1,6,0,1,1,0,0,0),(7,1,7,0,1,1,0,0,0),(8,1,8,0,1,1,0,0,0);
/*!40000 ALTER TABLE `gears` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `groups`
--

DROP TABLE IF EXISTS `groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `groups` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `MT` int(11) NOT NULL,
  `Comment` varchar(256) NOT NULL,
  `Type` int(11) NOT NULL,
  `Rad` int(11) NOT NULL,
  `D1` double NOT NULL,
  `D2` double NOT NULL,
  `D3` double NOT NULL,
  `D4` double NOT NULL,
  `R1` double NOT NULL,
  `R2` double NOT NULL,
  `R3` double NOT NULL,
  `R4` double NOT NULL,
  `R5` double NOT NULL,
  `R6` double NOT NULL,
  `R7` double NOT NULL,
  `M0` double NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `groups`
--

LOCK TABLES `groups` WRITE;
/*!40000 ALTER TABLE `groups` DISABLE KEYS */;
INSERT INTO `groups` VALUES (1,1,'круг',0,53,-1,-0.9,9.9,10,0.14,0.07,0.14,0.07,0.05,0,0,0),(2,1,'кольцо',65536,53,0,0,0,0,10,2,10,0.2,0,0,0,0),(3,1,'круг-кольцо',65536,21,0,0,0,0,10,2,10,0.2,0,0,0,0),(4,1,'sofit1',327681,53,0,4.8999999999999995,995.1,1000,2,0.2,1.4,0.2,0.05,0,0,0),(5,1,'sofit2',327681,53,0,0,0,0,2,0.2,2,0.2,0.05,0,0,0);
/*!40000 ALTER TABLE `groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `grpdec`
--

DROP TABLE IF EXISTS `grpdec`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `grpdec` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `MT` int(11) NOT NULL,
  `DecorationID` int(11) NOT NULL,
  `GroupID` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `gdGroupIndex` (`GroupID`),
  KEY `gdDecorationIndex` (`DecorationID`),
  CONSTRAINT `grpdec_ibfk_1` FOREIGN KEY (`GroupID`) REFERENCES `groups` (`ID`) ON DELETE CASCADE,
  CONSTRAINT `grpdec_ibfk_2` FOREIGN KEY (`DecorationID`) REFERENCES `decorations` (`ID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `grpdec`
--

LOCK TABLES `grpdec` WRITE;
/*!40000 ALTER TABLE `grpdec` DISABLE KEYS */;
INSERT INTO `grpdec` VALUES (2,1,2,2),(3,1,3,3),(4,1,4,1),(5,1,4,2),(6,1,1,1),(7,1,5,4);
/*!40000 ALTER TABLE `grpdec` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kinematikmodelnode`
--

DROP TABLE IF EXISTS `kinematikmodelnode`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `kinematikmodelnode` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `DecorationID` int(11) NOT NULL,
  `Order` int(11) NOT NULL,
  `Type` int(11) NOT NULL,
  `ParentNode` int(11) NOT NULL,
  `Caption` varchar(256) NOT NULL,
  `ForvardRule` longtext,
  `BackwardRule` longtext,
  `R` double NOT NULL,
  `G` double NOT NULL,
  `B` double NOT NULL,
  `Texture` varchar(256) DEFAULT NULL,
  `ObjType` varchar(256) DEFAULT NULL,
  `Obj` mediumblob,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kinematikmodelnode`
--

LOCK TABLES `kinematikmodelnode` WRITE;
/*!40000 ALTER TABLE `kinematikmodelnode` DISABLE KEYS */;
/*!40000 ALTER TABLE `kinematikmodelnode` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `markers`
--

DROP TABLE IF EXISTS `markers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `markers` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `MT` int(11) NOT NULL,
  `PerformID` int(11) NOT NULL,
  `Caption` varchar(256) NOT NULL,
  `D1` int(11) NOT NULL,
  `D2` int(11) NOT NULL,
  `D3` int(11) NOT NULL,
  `D4` int(11) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `markers`
--

LOCK TABLES `markers` WRITE;
/*!40000 ALTER TABLE `markers` DISABLE KEYS */;
/*!40000 ALTER TABLE `markers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `performs`
--

DROP TABLE IF EXISTS `performs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `performs` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `MT` int(11) NOT NULL,
  `Caption` varchar(256) NOT NULL,
  `Comment` varchar(256) NOT NULL,
  `Date` int(11) NOT NULL,
  `Ver` int(11) NOT NULL,
  `Active` int(11) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `performs`
--

LOCK TABLES `performs` WRITE;
/*!40000 ALTER TABLE `performs` DISABLE KEYS */;
INSERT INTO `performs` VALUES (2,1,'тест','тест',-1078038808,0,0),(3,1,'we','we',-1230052368,0,0),(4,1,'test1','Коментарий',-1080121656,0,0),(5,1,'проверка софитов','Коментарий',1354257,0,1),(6,1,'kior','Коментарий',1392066,0,1);
/*!40000 ALTER TABLE `performs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `plans`
--

DROP TABLE IF EXISTS `plans`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `plans` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `caption` varchar(256) NOT NULL,
  `perfID` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `perfIndex` (`perfID`),
  CONSTRAINT `plans_ibfk_1` FOREIGN KEY (`perfID`) REFERENCES `performs` (`ID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plans`
--

LOCK TABLES `plans` WRITE;
/*!40000 ALTER TABLE `plans` DISABLE KEYS */;
INSERT INTO `plans` VALUES (1,'plan name',1),(2,'sofits',1),(3,'sofits',2),(4,'shtankets',1);
/*!40000 ALTER TABLE `plans` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `producers`
--

DROP TABLE IF EXISTS `producers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `producers` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `MT` int(11) NOT NULL,
  `ProductType` int(11) NOT NULL,
  `Caption` varchar(256) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `producers`
--

LOCK TABLES `producers` WRITE;
/*!40000 ALTER TABLE `producers` DISABLE KEYS */;
/*!40000 ALTER TABLE `producers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `protocol`
--

DROP TABLE IF EXISTS `protocol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `protocol` (
  `MT` int(11) NOT NULL,
  `Major` int(11) NOT NULL,
  `Minor` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `protocol`
--

LOCK TABLES `protocol` WRITE;
/*!40000 ALTER TABLE `protocol` DISABLE KEYS */;
/*!40000 ALTER TABLE `protocol` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `restrictions`
--

DROP TABLE IF EXISTS `restrictions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `restrictions` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `MT` int(11) NOT NULL,
  `ParentID` int(11) NOT NULL,
  `Type` int(11) NOT NULL,
  `S1` varchar(256) NOT NULL,
  `S2` varchar(256) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `restrictions`
--

LOCK TABLES `restrictions` WRITE;
/*!40000 ALTER TABLE `restrictions` DISABLE KEYS */;
/*!40000 ALTER TABLE `restrictions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sensors`
--

DROP TABLE IF EXISTS `sensors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sensors` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `MT` int(11) NOT NULL,
  `TempID` int(11) DEFAULT NULL,
  `GearID` int(11) DEFAULT NULL,
  `ConnectionID` int(11) DEFAULT NULL,
  `Param` int(11) NOT NULL,
  `Factor` double NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `sensTempIndex` (`TempID`),
  KEY `sensGearIndex` (`GearID`),
  KEY `sensConnIndex` (`ConnectionID`),
  CONSTRAINT `sensors_ibfk_1` FOREIGN KEY (`TempID`) REFERENCES `templates` (`ID`) ON DELETE CASCADE,
  CONSTRAINT `sensors_ibfk_2` FOREIGN KEY (`GearID`) REFERENCES `gears` (`ID`) ON DELETE CASCADE,
  CONSTRAINT `sensors_ibfk_3` FOREIGN KEY (`ConnectionID`) REFERENCES `connections` (`ID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sensors`
--

LOCK TABLES `sensors` WRITE;
/*!40000 ALTER TABLE `sensors` DISABLE KEYS */;
INSERT INTO `sensors` VALUES (6,1,4,6,18,0,1),(7,1,7,7,20,1,-1),(8,1,7,8,22,1,1);
/*!40000 ALTER TABLE `sensors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sequences`
--

DROP TABLE IF EXISTS `sequences`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sequences` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `MT` int(11) NOT NULL,
  `StageID` int(11) NOT NULL,
  `GroupID` int(11) NOT NULL,
  `Number` int(11) NOT NULL,
  `d1` double NOT NULL,
  `d2` double NOT NULL,
  `d3` int(11) NOT NULL,
  `d4` double NOT NULL,
  `d5` double NOT NULL,
  `d6` int(11) NOT NULL,
  `d7` double NOT NULL,
  `d8` double NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `seqStageIndex` (`StageID`),
  KEY `seqGroupIndex` (`GroupID`),
  CONSTRAINT `sequences_ibfk_1` FOREIGN KEY (`StageID`) REFERENCES `stages` (`ID`) ON DELETE CASCADE,
  CONSTRAINT `sequences_ibfk_2` FOREIGN KEY (`GroupID`) REFERENCES `groups` (`ID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sequences`
--

LOCK TABLES `sequences` WRITE;
/*!40000 ALTER TABLE `sequences` DISABLE KEYS */;
INSERT INTO `sequences` VALUES (19,1,32,1,1,0,9.9225,1,6.3,2,-2147483508,3.15,0),(20,1,32,1,2,9.9225,140.154998,1,6.3,0,-2147417972,22.246825,0),(21,1,32,1,3,150.077497,9.9225,1,0,2,-2147352436,3.15,0),(22,1,32,1,5,159.999998,-9.9225,1,-6.3,-2,140,3.15,0),(23,1,32,1,6,150.077497,-80.155,1,-6.3,0,65676,12.723016,0),(24,1,32,1,7,69.922497,-9.9225,1,0,2,131212,3.15,0),(28,1,32,1,9,59.999997,9.9225,1,6.3,2,-2147483503,3.15,120),(29,1,32,1,10,69.922497,200.155002,1,6.3,0,-2147417967,31.770635,120),(30,1,32,1,11,270.077499,9.9225,1,0,2,-2147352431,3.15,120),(31,1,32,2,1,0,34.998968,0,10,2,-2147483508,7,0),(32,1,32,2,2,34.998968,30,0,10,0,-2147417972,3,0),(33,1,32,2,3,64.998968,35.001032,0,0,2,-2147352436,7,0),(34,1,32,1,12,279.999999,-35,0,-10,2,140,7,0),(35,1,32,1,13,244.999999,-100,0,-10,0,65676,10,0),(36,1,32,1,14,144.999999,-35,0,0,2,131212,7,0),(37,1,33,1,1,109.999999,0,0,0,0,110,12,0),(38,1,32,1,4,159.999998,0,0,0,1,1073741944,0.01,0),(39,1,32,1,8,59.999997,0,1,0,0,1073741934,10,0),(40,0,44,4,1,0,0.39200000000000007,1,0.14,0.025,-2147483508,5.6000000000000005,0),(41,0,44,4,2,0.39200000000000007,2.6319999999999997,1,0.14,0,-2147417972,18.799999999999997,0),(42,0,44,4,3,3.0239999999999996,0.39200000000000007,1,0,0.1,-2147352436,5.6000000000000005,0);
/*!40000 ALTER TABLE `sequences` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `settings`
--

DROP TABLE IF EXISTS `settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `settings` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `MT` int(11) NOT NULL,
  `Category` int(11) NOT NULL,
  `Caption` varchar(256) NOT NULL,
  `V1` varchar(256) NOT NULL,
  `V2` varchar(256) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `settings`
--

LOCK TABLES `settings` WRITE;
/*!40000 ALTER TABLE `settings` DISABLE KEYS */;
/*!40000 ALTER TABLE `settings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stages`
--

DROP TABLE IF EXISTS `stages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `stages` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `MT` int(11) NOT NULL,
  `PerformID` int(11) NOT NULL,
  `Number` int(11) NOT NULL,
  `Caption` varchar(256) NOT NULL,
  `Comment` varchar(256) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `stagPerfIndex` (`PerformID`),
  CONSTRAINT `stages_ibfk_1` FOREIGN KEY (`PerformID`) REFERENCES `performs` (`ID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stages`
--

LOCK TABLES `stages` WRITE;
/*!40000 ALTER TABLE `stages` DISABLE KEYS */;
INSERT INTO `stages` VALUES (32,1,2,1,'Сцена1','Сцена1'),(33,1,2,2,'Сцена 2','Сцена 2'),(34,1,3,1,'Сцена - название','Сцена - комментарий'),(35,1,2,3,'efwee','fwefwefwef'),(36,1,2,4,'efwef','wefwefwefwefwe'),(37,1,2,5,'ewf54','54gerfer'),(38,1,2,6,'regf54ggfdvdfger','rett3gfer3rgfege'),(39,1,2,7,'rhb46h4hbe','ergve trbhrtghrtg45g'),(40,1,2,8,'trg t rtg  nmtybrtgb ','tr rtgh trhrth rtgr'),(41,1,2,9,'grtg456      thrfgtbh dfbg rfgrt','gr th6h4tr hn5yt 46h  5 htr '),(43,1,5,1,'1',''),(44,1,6,1,'10 min razgon 10 min edit 10 tormoz','');
/*!40000 ALTER TABLE `stages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `templates`
--

DROP TABLE IF EXISTS `templates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `templates` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `MT` int(11) NOT NULL,
  `Catalog` varchar(256) NOT NULL,
  `Type` int(11) NOT NULL,
  `MarkCount` int(11) NOT NULL,
  `Producer` int(11) NOT NULL,
  `ProductType` int(11) NOT NULL,
  `Bits` int(11) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `templates`
--

LOCK TABLES `templates` WRITE;
/*!40000 ALTER TABLE `templates` DISABLE KEYS */;
INSERT INTO `templates` VALUES (1,1,'первый - вращение',1,10000,0,0,0),(4,1,'второй - вращение',1,10000,0,0,0),(5,1,'первый - линейный',65537,955,0,0,0),(6,1,'второй - линейный',65537,1365,0,0,0),(7,1,'софитный',65537,10000,0,0,0);
/*!40000 ALTER TABLE `templates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `MT` int(11) NOT NULL,
  `Grp` int(11) NOT NULL,
  `Login` varchar(256) NOT NULL,
  `Password` varchar(256) NOT NULL,
  `PassPSP` varchar(256) NOT NULL,
  `FIO` varchar(256) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,1,0,'root','1','1','super admin'),(2,0,0,'SCIRCUS','1','',''),(3,0,0,'user0','1','1','fio'),(4,0,0,'user1','1','1','fio'),(5,0,0,'user2','1','1','fio'),(6,0,0,'user3','1','1','fio'),(7,0,0,'user4','1','1','fio'),(8,0,0,'user5','1','1','fio'),(9,0,0,'user6','1','1','fio'),(10,0,0,'user7','1','1','fio');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usrprf`
--

DROP TABLE IF EXISTS `usrprf`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usrprf` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `MT` int(11) NOT NULL,
  `PerformID` int(11) NOT NULL,
  `UserID` int(11) NOT NULL,
  `Type` int(11) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usrprf`
--

LOCK TABLES `usrprf` WRITE;
/*!40000 ALTER TABLE `usrprf` DISABLE KEYS */;
/*!40000 ALTER TABLE `usrprf` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2014-02-17  2:22:41
