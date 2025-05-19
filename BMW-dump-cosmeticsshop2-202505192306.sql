-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: cosmeticsshop2
-- ------------------------------------------------------
-- Server version	8.0.34

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
-- Table structure for table `address`
--

DROP TABLE IF EXISTS `address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `address` (
  `addressId` bigint NOT NULL AUTO_INCREMENT,
  `customerId` bigint DEFAULT NULL,
  `address` text,
  `district` text,
  `province` text,
  `receiverName` text,
  `receiverPhone` varchar(255) DEFAULT NULL,
  `ward` text,
  PRIMARY KEY (`addressId`),
  KEY `FKbwub7vjb2078mhmvlstpmwvff` (`customerId`),
  CONSTRAINT `FKbwub7vjb2078mhmvlstpmwvff` FOREIGN KEY (`customerId`) REFERENCES `user` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `address`
--

LOCK TABLES `address` WRITE;
/*!40000 ALTER TABLE `address` DISABLE KEYS */;
INSERT INTO `address` VALUES (1,4,'Số 1, Đường 1, Phường 1','Quận 1','TP.HCM','Lê Văn An2','0387313003','Phường 1'),(2,4,'Số 2, Đường 2, Phường 2','Quận 1','TP.HCM','Lê Văn An','0387313003','Phường 1'),(3,4,'Số 3, Đường 3, Phường 3','Quận 1','TP.HCM','Lê Văn An','0387313003','Phường 1'),(4,4,'à','Huyện Ba Bể','Bắc Kạn','va','faf','Dương Quỳ');
/*!40000 ALTER TABLE `address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `cartId` bigint NOT NULL AUTO_INCREMENT,
  `customerId` bigint DEFAULT NULL,
  PRIMARY KEY (`cartId`),
  UNIQUE KEY `UKphw8s97kjckd9ejjxoa6t1v97` (`customerId`),
  CONSTRAINT `FK2kwc0rgoxa7sodwng24wg7pxn` FOREIGN KEY (`customerId`) REFERENCES `user` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
INSERT INTO `cart` VALUES (1,4);
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cartitem`
--

DROP TABLE IF EXISTS `cartitem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cartitem` (
  `cartId` bigint DEFAULT NULL,
  `cartItemId` bigint NOT NULL AUTO_INCREMENT,
  `productId` bigint DEFAULT NULL,
  `quantity` bigint DEFAULT NULL,
  PRIMARY KEY (`cartItemId`),
  KEY `FK1ddqmbytuin6giodgt7m8ele5` (`cartId`),
  KEY `FKfm2xpv0aksxnpoucoywb41f86` (`productId`),
  CONSTRAINT `FK1ddqmbytuin6giodgt7m8ele5` FOREIGN KEY (`cartId`) REFERENCES `cart` (`cartId`),
  CONSTRAINT `FKfm2xpv0aksxnpoucoywb41f86` FOREIGN KEY (`productId`) REFERENCES `product` (`productId`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cartitem`
--

LOCK TABLES `cartitem` WRITE;
/*!40000 ALTER TABLE `cartitem` DISABLE KEYS */;
INSERT INTO `cartitem` VALUES (1,34,10003,1);
/*!40000 ALTER TABLE `cartitem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `active` bit(1) DEFAULT NULL,
  `categoryId` bigint NOT NULL AUTO_INCREMENT,
  `categoryName` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`categoryId`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (_binary '',1,'Cơ thể'),(_binary '',2,'Hương thơm'),(_binary '',3,'Sức khỏe'),(_binary '',4,'Da'),(_binary '',5,'Trang điểm'),(_binary '',6,'Tóc');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feedbackresponse`
--

DROP TABLE IF EXISTS `feedbackresponse`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feedbackresponse` (
  `feedbackResponseId` bigint NOT NULL AUTO_INCREMENT,
  `productFeedbackId` bigint DEFAULT NULL,
  `responseDate` datetime(6) DEFAULT NULL,
  `comment` text,
  PRIMARY KEY (`feedbackResponseId`),
  UNIQUE KEY `UK5orhf120t8iw7aojvui6nquty` (`productFeedbackId`),
  CONSTRAINT `FK5xgo2l58ok36n96u0ox646uwj` FOREIGN KEY (`productFeedbackId`) REFERENCES `productfeedback` (`productFeedbackId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedbackresponse`
--

LOCK TABLES `feedbackresponse` WRITE;
/*!40000 ALTER TABLE `feedbackresponse` DISABLE KEYS */;
/*!40000 ALTER TABLE `feedbackresponse` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order`
--

DROP TABLE IF EXISTS `order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order` (
  `total` double DEFAULT NULL,
  `customerId` bigint DEFAULT NULL,
  `deliveryDate` datetime(6) DEFAULT NULL,
  `orderDate` datetime(6) DEFAULT NULL,
  `orderId` bigint NOT NULL AUTO_INCREMENT,
  `orderStatus` enum('CANCELLED','COMPLETED','CONFIRMED','PENDING','SHIPPING') DEFAULT NULL,
  PRIMARY KEY (`orderId`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order`
--

LOCK TABLES `order` WRITE;
/*!40000 ALTER TABLE `order` DISABLE KEYS */;
INSERT INTO `order` VALUES (174000,4,NULL,'2025-05-19 22:26:29.542000',21,'CONFIRMED');
/*!40000 ALTER TABLE `order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orderline`
--

DROP TABLE IF EXISTS `orderline`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orderline` (
  `orderId` bigint DEFAULT NULL,
  `orderLineId` bigint NOT NULL AUTO_INCREMENT,
  `productId` bigint DEFAULT NULL,
  `quantity` bigint DEFAULT NULL,
  `productSnapshot` text,
  PRIMARY KEY (`orderLineId`),
  KEY `FKryuvc5wwb5a8c4jvgq9cu4jiw` (`orderId`),
  KEY `FK56pyysqpeh9pwrx4uffpfn4ol` (`productId`),
  CONSTRAINT `FK56pyysqpeh9pwrx4uffpfn4ol` FOREIGN KEY (`productId`) REFERENCES `product` (`productId`),
  CONSTRAINT `FKryuvc5wwb5a8c4jvgq9cu4jiw` FOREIGN KEY (`orderId`) REFERENCES `order` (`orderId`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orderline`
--

LOCK TABLES `orderline` WRITE;
/*!40000 ALTER TABLE `orderline` DISABLE KEYS */;
INSERT INTO `orderline` VALUES (21,30,10003,1,'{\"image\":\"https://static.thcdn.com/images/large/origen//productimg/1600/1600/12226505-1944858625105160.jpg\",\"cost\":120000.0,\"ingredient\":\"Natri clorua, Dầu Prunus Amygdalus Dulcis (Hạnh nhân ngọt), Dầu hạt Helianthus Annuus (Hướng dương), Caprylic/Capric Triglyceride, Limonene, Dầu vỏ Citrus Paradisi (Bưởi), Dầu lá Cupressus Sempervirens, Dầu khuynh diệp Citriodora, Dầu Pelargonium Graveolens, Rosmarinus Officinalis (Hương thảo) Dầu lá, Tocopherol, Dầu trái cây Juniperus Communis, Citronellol, Hương thơm* (Parfum), Geraniol, Linalool. *100% Hương Thơm Tự Nhiên.\",\"productId\":10003,\"origin\":\"Đức\",\"description\":\"Tăng cường làn da mịn màng đẹp đẽ của bạn với Muối tẩy tế bào chết nhẹ nhàng tẩy tế bào chết của ESPA: một công thức tinh chế được tạo thành từ muối biển và các loại tinh dầu tinh khiết nhất, hiệu quả nhất của thiên nhiên. Được chế tạo cẩn thận bởi các nhà trị liệu bằng hương thơm của ESPA với hương thơm sảng khoái và nâng cao tinh thần của bưởi, cây bách và bạch đàn, loại tẩy tế bào chết này giúp làm mịn và làm sáng làn da của bạn một cách hiệu quả - giúp loại bỏ nhẹ nhàng các tế bào da chết xỉn màu và các mảng sần sùi. Muối biển thô tự nhiên được ngâm trong hỗn hợp các loại dầu dưỡng ẩm, chẳng hạn như dầu hạnh nhân ngọt, để tẩy da chết nhẹ nhàng và tăng cường trị liệu bằng hương thơm tiếp thêm sinh lực! Kết quả? Làn da của bạn sẽ có cảm giác được ngậm nước mạnh mẽ, mềm mại và dẻo dai. Chẳng bao lâu nữa bạn sẽ không muốn ngâm mình mà không có nó...\",\"how_to_use\":\"ĐỂ CÓ KẾT QUẢ TỐT NHẤT Một hoặc hai lần một tuần, mát xa lên vùng da khô theo chuyển động tròn hướng lên trên. Đặc biệt chú ý đến những vùng da khô, sau đó rửa sạch.\",\"productName\":\"Muối tẩy tế bào chết ESPA 700g\",\"volume\":\"700g\",\"productCode\":\"Body_6\",\"manufactureDate\":\"2023-07-22\",\"brand\":\"ESPA\",\"expirationDate\":\"2026-07-21\"}'),(21,31,10002,1,'{\"image\":\"https://static.thcdn.com/images/large/origen//productimg/1600/1600/13494909-1805054772989862.jpg\",\"cost\":54000.0,\"ingredient\":\"Nước / Nước, Diisopropyl Sebacate, Alcohol Denat., Ethylhexyl Salicylate, Ethylhexyl Triazone, Bis-Ethylhexyloxyphenol Methoxyphenyl Triazine, Diisopropyl Adipate, Peg-8, Dipropylene Glycol, C12-22 Alkyl Acrylate/Hydroxyethylacrylate Copolymer, Glycerin, Drometrizole Trisiloxane, Tinh bột nhôm Octenylsuccinate , Butyl Methoxydibenzoylmethane, Methoxypropylamino Cyclohexenylidene Ethoxyethylcyanoacetate, Silica, Tocopherol, Diethylamino Hydroxybenzoyl Hexyl Benzoate, Acrylates Copolymer, Acrylates/C10-30 Alkyl Acrylate Crosspolymer, Caprylyl Glycol, Hydroxyacetophenone, Pentaerythrityl Tetra-Di-T-Butyl Hydroxyhydrocinnamate, Natri Polyacrylate, ylidene Dicamphor Sulfonic Axit, Trietanolamine, Trisodium Ethylenediamine Disuccine.\",\"productId\":10002,\"origin\":\"Hàn Quốc\",\"description\":\"Lý tưởng cho các loại da nhạy cảm, Kem dưỡng ẩm La Roche-Posay Anthelios UVMUNE 400 cung cấp khả năng bảo vệ SPF50 với công nghệ lọc MEXORYL400 độc quyền, giúp chống lại các tia UVA, UVB và tia UVA siêu dài*. Công thức chống nước, mồ hôi và cát để bảo vệ lâu dài, cực cao. Được thiết kế với mục đích thoải mái, kem dưỡng ẩm cho da mà không gây cảm giác nhờn. Không chứa hương liệu và với công thức nhẹ nhàng, chống cay mắt, SPF thể hiện công nghệ chăm sóc da tốt nhất của thương hiệu, đã được kiểm tra về hiệu quả và độ dịu nhẹ. * [380-400nm] = UVA dài/ [380-400nm] = phần cuối của quang phổ mà chúng tôi gọi là UVA siêu dài.\",\"how_to_use\":\"Để sử dụng hàng ngày và phơi nắng. Thoa sản phẩm chống nắng ngay trước khi tiếp xúc. Thoa lại thường xuyên và nhiều để duy trì khả năng bảo vệ, đặc biệt là sau khi đổ mồ hôi hoặc lau khăn.\",\"productName\":\"Kem chống nắng dưỡng ẩm La Roche-Posay Anthelios UVMune 400 SPF 50 50ml\",\"volume\":\"50ml\",\"productCode\":\"Body_57\",\"manufactureDate\":\"2022-12-12\",\"brand\":\"La Roche-Posay\",\"expirationDate\":\"2025-12-11\"}');
/*!40000 ALTER TABLE `orderline` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orderstatushistory`
--

DROP TABLE IF EXISTS `orderstatushistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orderstatushistory` (
  `orderStatusHistoryId` bigint NOT NULL AUTO_INCREMENT,
  `description` varchar(255) DEFAULT NULL,
  `status` enum('CANCELLED','COMPLETED','CONFIRMED','PENDING','SHIPPING') DEFAULT NULL,
  `updateAt` datetime(6) DEFAULT NULL,
  `orderId` bigint DEFAULT NULL,
  PRIMARY KEY (`orderStatusHistoryId`),
  KEY `FKm3r3mv8b3sxb8tjmhamwsqa89` (`orderId`),
  CONSTRAINT `FKm3r3mv8b3sxb8tjmhamwsqa89` FOREIGN KEY (`orderId`) REFERENCES `order` (`orderId`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orderstatushistory`
--

LOCK TABLES `orderstatushistory` WRITE;
/*!40000 ALTER TABLE `orderstatushistory` DISABLE KEYS */;
INSERT INTO `orderstatushistory` VALUES (12,'Đơn hàng đã được tạo','PENDING','2025-05-19 22:26:29.548946',21);
/*!40000 ALTER TABLE `orderstatushistory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment`
--

DROP TABLE IF EXISTS `payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment` (
  `total` double DEFAULT NULL,
  `orderId` bigint DEFAULT NULL,
  `paymentDate` datetime(6) DEFAULT NULL,
  `paymentId` bigint NOT NULL AUTO_INCREMENT,
  `paymentMethod` enum('COD','MOMO','PAYPAL','VNPAY') DEFAULT NULL,
  `paymentStatus` enum('CANCELLED','PAID','PENDING') DEFAULT NULL,
  PRIMARY KEY (`paymentId`),
  UNIQUE KEY `UKno7ihp4a5f00brsmbbcuuf3r0` (`orderId`),
  CONSTRAINT `FKrpx3gvg8jh0h7rmu4428u3b6m` FOREIGN KEY (`orderId`) REFERENCES `order` (`orderId`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment`
--

LOCK TABLES `payment` WRITE;
/*!40000 ALTER TABLE `payment` DISABLE KEYS */;
INSERT INTO `payment` VALUES (174000,21,'2025-05-19 22:26:29.542000',21,'COD','PENDING');
/*!40000 ALTER TABLE `payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `active` bit(1) DEFAULT NULL,
  `cost` double DEFAULT NULL,
  `expirationDate` date DEFAULT NULL,
  `manufactureDate` date DEFAULT NULL,
  `categoryId` bigint DEFAULT NULL,
  `createdDate` datetime(6) DEFAULT NULL,
  `productId` bigint NOT NULL AUTO_INCREMENT,
  `brand` text,
  `description` text,
  `how_to_use` text,
  `image` text,
  `ingredient` text,
  `origin` text,
  `productCode` varchar(255) DEFAULT NULL,
  `productName` text,
  `volume` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`productId`),
  UNIQUE KEY `UK8ins91angxh484x14552jy7xy` (`productCode`),
  KEY `FK42iy97xlo64j31dslbn36vmyh` (`categoryId`),
  CONSTRAINT `FK42iy97xlo64j31dslbn36vmyh` FOREIGN KEY (`categoryId`) REFERENCES `category` (`categoryId`)
) ENGINE=InnoDB AUTO_INCREMENT=60012 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (_binary '',33000,'2025-05-28','2022-05-29',1,'2023-12-19 07:09:13.000000',10000,'Aesop','Xịt khoáng có chứa cồn để nhanh chóng làm sạch bàn tay của bạn khi không có nước, Xịt rửa tay không chứa nước rửa tay Aesop\'s Resurrection Rinse là một lựa chọn tiện lợi khi di chuyển để tiêu diệt các vi trùng nguy hiểm và mang lại làn da tươi mát và thơm mát. Với đồng phân saccharide dưỡng ẩm và lô hội, công thức không làm khô nhắm vào \'kẻ xấu\' mà không làm mất đi lớp dầu trên da, do đó, da ít bị nứt nẻ khi được làm sạch liên tục. Bay hơi nhanh mà không để lại cặn dầu mỡ, sản phẩm này tự hào có mùi hương \'Phục sinh\' đặc biệt - và tuyệt vời; sự pha trộn của quýt, lá hương thảo và gỗ tuyết tùng, giúp bạn sảng khoái và tập trung lại các giác quan bất cứ khi nào bạn xịt nước bọt. Đó là nước rửa tay trong mơ, vì vậy hãy đảm bảo bạn có một chiếc để trong túi và một chiếc để cạnh cửa để không bỏ qua bước quan trọng, \'bước khử trùng\'.','Xịt tự do lên tay theo yêu cầu và để khô.','https://static.thcdn.com/images/large/origen//productimg/1600/1600/12806727-1724965867482022.jpg','Alcohol Denat., Nước (Aqua), Glycerin, Saccharide Isomerate, Dầu vỏ Citrus Nobilis (Quả quýt), Nước ép lá Aloe Barbadensis, Dầu vỏ cây Cedrus Atlantica (Cedarwood), Dầu Lavandula Angustifolia (Lavender), Dầu Citrus Aurantium Dulcis (Cam) , Dầu lá Rosmarinus Officinalis (Hương thảo), Axit Citric, Natri Citrate, Limonene, Linalool.','Anh','Body_63','Xịt Rửa Tay Aesop Resurrection 50Ml','50ml'),(_binary '',111000,'2027-07-02','2024-07-02',1,'2024-01-04 11:14:16.000000',10001,'Paula\'s Choice','Lý tưởng cho làn da dầu, da hỗn hợp và da dễ nổi mụn, PAULA\'S CHOICE\'s resist Youth-Extending Daily Hydrating Fluid SPF 50 bảo vệ da khỏi tác hại của ánh nắng mặt trời mà không gây cảm giác nặng nề hay tắc nghẽn lỗ chân lông. Kem dưỡng ẩm không trọng lượng này kết hợp SPF 50 phổ rộng với các chất chống oxy hóa nuôi dưỡng để mang lại vẻ ngoài trẻ trung hơn và bảo vệ làn da của bạn khỏi tác hại của môi trường. Một hỗn hợp gồm các chất chống oxy hóa, bao gồm chiết xuất trà xanh, giúp chống lại các gốc tự do (từ ánh sáng mặt trời và ô nhiễm) và làm dịu làn da của bạn. Là một trong những chất lọc tia UVA được sử dụng rộng rãi nhất trên thế giới, avobenzone là một thành phần chống nắng tổng hợp mang lại khả năng chống nắng phổ rộng cho hỗn hợp này. Chúng tôi biết một mặt hàng chủ lực hàng ngày khi chúng tôi nhìn thấy một...','Áp dụng như bước cuối cùng trong thói quen chăm sóc da buổi sáng của bạn. Để một lúc cho khô trước khi trang điểm.','https://static.thcdn.com/images/large/origen//productimg/1600/1600/11174232-9234929123038565.jpg','Aqua, Ethylhexyl Methoxycinnamate (Octinoxate, 7,5%, kem chống nắng), Glycerin (hydrat hóa/bổ sung nước cho da), Ethylhexyl Salicylate (Octisalate, 5%, kem chống nắng), Silica (chất hấp thụ), Octocrylene (2%, kem chống nắng), Butyl Methoxydibenzoylmethane (Avobenzone, 2%, kem chống nắng), Dimethicone (hydrat hóa), Benzyl Alcohol (chất bảo quản), Tocopherol (vitamin E/chất chống oxy hóa), Chiết xuất hoa Chamomilla Recutita (Matricaria) (chất chống oxy hóa), Vitis Vinifera (Nho) Chiết xuất hạt (chất chống oxy hóa), Chiết xuất lá Camellia Sinensis (Trà xanh) (chất chống oxy hóa), Chiết xuất lá Camellia Oleifera (Trà xanh) (chất chống oxy hóa), Chiết xuất Peucedanum Graveolens (Thì là) (chất chống oxy hóa), Chiết xuất trái cây Sambucus Nigra (Black Elderberry) (chất chống oxy hóa), Avena Sativa (Yến mạch) ) Chiết xuất cám (làm dịu da), Chiết xuất Punica Granatum (Quả lựu) (chống oxy hóa), Lycium Barbarum (Goij) Chiết xuất trái cây (chống oxy hóa), Hydrogenated Lecithin (phục hồi da), Titanium Dioxide (tăng cường kết cấu/tăng cường kết cấu), Dimethicone/Vinyl Dimethicone Crosspolymer (hydrat hóa), Diethylhexyl Syringylidenemalonate (hydrat hóa), Hydroxyethyl Acrylate/Sodium Acryloyldimethyl Taurate Copolymer (chất tạo màng/hỗn dịch), Xanthan Gum (tăng cường kết cấu), Natri Carbomer (tăng cường kết cấu), Natri Benzoate ( chất ổn định), Kali Sorbate (chất ổn định), Phenoxyetanol (chất bảo quản).','Ý','Body_76','Paula\'s Choice Chống lại chất lỏng dưỡng ẩm hàng ngày kéo dài tuổi trẻ SPF 50','60ml'),(_binary '',54000,'2025-12-11','2022-12-12',1,'2024-07-02 23:34:36.000000',10002,'La Roche-Posay','Lý tưởng cho các loại da nhạy cảm, Kem dưỡng ẩm La Roche-Posay Anthelios UVMUNE 400 cung cấp khả năng bảo vệ SPF50 với công nghệ lọc MEXORYL400 độc quyền, giúp chống lại các tia UVA, UVB và tia UVA siêu dài*. Công thức chống nước, mồ hôi và cát để bảo vệ lâu dài, cực cao. Được thiết kế với mục đích thoải mái, kem dưỡng ẩm cho da mà không gây cảm giác nhờn. Không chứa hương liệu và với công thức nhẹ nhàng, chống cay mắt, SPF thể hiện công nghệ chăm sóc da tốt nhất của thương hiệu, đã được kiểm tra về hiệu quả và độ dịu nhẹ. * [380-400nm] = UVA dài/ [380-400nm] = phần cuối của quang phổ mà chúng tôi gọi là UVA siêu dài.','Để sử dụng hàng ngày và phơi nắng. Thoa sản phẩm chống nắng ngay trước khi tiếp xúc. Thoa lại thường xuyên và nhiều để duy trì khả năng bảo vệ, đặc biệt là sau khi đổ mồ hôi hoặc lau khăn.','https://static.thcdn.com/images/large/origen//productimg/1600/1600/13494909-1805054772989862.jpg','Nước / Nước, Diisopropyl Sebacate, Alcohol Denat., Ethylhexyl Salicylate, Ethylhexyl Triazone, Bis-Ethylhexyloxyphenol Methoxyphenyl Triazine, Diisopropyl Adipate, Peg-8, Dipropylene Glycol, C12-22 Alkyl Acrylate/Hydroxyethylacrylate Copolymer, Glycerin, Drometrizole Trisiloxane, Tinh bột nhôm Octenylsuccinate , Butyl Methoxydibenzoylmethane, Methoxypropylamino Cyclohexenylidene Ethoxyethylcyanoacetate, Silica, Tocopherol, Diethylamino Hydroxybenzoyl Hexyl Benzoate, Acrylates Copolymer, Acrylates/C10-30 Alkyl Acrylate Crosspolymer, Caprylyl Glycol, Hydroxyacetophenone, Pentaerythrityl Tetra-Di-T-Butyl Hydroxyhydrocinnamate, Natri Polyacrylate, ylidene Dicamphor Sulfonic Axit, Trietanolamine, Trisodium Ethylenediamine Disuccine.','Hàn Quốc','Body_57','Kem chống nắng dưỡng ẩm La Roche-Posay Anthelios UVMune 400 SPF 50 50ml','50ml'),(_binary '',120000,'2026-07-21','2023-07-22',1,'2024-06-08 05:23:00.000000',10003,'ESPA','Tăng cường làn da mịn màng đẹp đẽ của bạn với Muối tẩy tế bào chết nhẹ nhàng tẩy tế bào chết của ESPA: một công thức tinh chế được tạo thành từ muối biển và các loại tinh dầu tinh khiết nhất, hiệu quả nhất của thiên nhiên. Được chế tạo cẩn thận bởi các nhà trị liệu bằng hương thơm của ESPA với hương thơm sảng khoái và nâng cao tinh thần của bưởi, cây bách và bạch đàn, loại tẩy tế bào chết này giúp làm mịn và làm sáng làn da của bạn một cách hiệu quả - giúp loại bỏ nhẹ nhàng các tế bào da chết xỉn màu và các mảng sần sùi. Muối biển thô tự nhiên được ngâm trong hỗn hợp các loại dầu dưỡng ẩm, chẳng hạn như dầu hạnh nhân ngọt, để tẩy da chết nhẹ nhàng và tăng cường trị liệu bằng hương thơm tiếp thêm sinh lực! Kết quả? Làn da của bạn sẽ có cảm giác được ngậm nước mạnh mẽ, mềm mại và dẻo dai. Chẳng bao lâu nữa bạn sẽ không muốn ngâm mình mà không có nó...','ĐỂ CÓ KẾT QUẢ TỐT NHẤT Một hoặc hai lần một tuần, mát xa lên vùng da khô theo chuyển động tròn hướng lên trên. Đặc biệt chú ý đến những vùng da khô, sau đó rửa sạch.','https://static.thcdn.com/images/large/origen//productimg/1600/1600/12226505-1944858625105160.jpg','Natri clorua, Dầu Prunus Amygdalus Dulcis (Hạnh nhân ngọt), Dầu hạt Helianthus Annuus (Hướng dương), Caprylic/Capric Triglyceride, Limonene, Dầu vỏ Citrus Paradisi (Bưởi), Dầu lá Cupressus Sempervirens, Dầu khuynh diệp Citriodora, Dầu Pelargonium Graveolens, Rosmarinus Officinalis (Hương thảo) Dầu lá, Tocopherol, Dầu trái cây Juniperus Communis, Citronellol, Hương thơm* (Parfum), Geraniol, Linalool. *100% Hương Thơm Tự Nhiên.','Đức','Body_6','Muối tẩy tế bào chết ESPA 700g','700g'),(_binary '',57000,'2027-03-20','2024-03-20',1,'2024-03-02 00:04:03.000000',10004,'Caudalie','Với kết cấu nhẹ đến mức không ảnh hưởng đến khả năng bảo vệ hoặc bảo vệ hành tinh (nhờ công thức có khả năng phân hủy sinh học cao và không độc hại đối với hệ sinh thái biển), Caudalie Vinosun Protect Very High Protection Lightweight Cream SPF 50+ là bước cuối cùng lý tưởng vào buổi sáng của bạn. thói quen chăm sóc da. Được hỗ trợ bởi các polyphenol chống oxy hóa có nguồn gốc từ cây nho nổi tiếng của Caudalie, loại kem chống nắng có khả năng bảo vệ cao này bảo vệ da khỏi các tia UVA và UVB có hại cũng như ô nhiễm. Không chứa hương liệu (lý tưởng cho cả những loại da nhạy cảm) và hầu như không nhìn thấy trên mọi tông màu da, công thức siêu dưỡng ẩm này cung cấp độ ẩm cho làn da đang khát nước để có làn da ẩm mượt - và không để lại cặn nhờn.','Áp dụng hàng ngày, ngay cả khi bạn đang ở trong nhà. Áp dụng như bước cuối cùng trong quy trình chăm sóc da của bạn, ngay sau hoặc thay vì kem dưỡng ẩm và trước khi trang điểm.','https://static.thcdn.com/images/large/origen//productimg/1600/1600/13524487-8525038257522474.jpg','Aqua/Nước/Eau, Dibutyl Adipate, Diethylamino Hydroxybenzoyl Hexyl Benzoate, Propanediol, Dicaprylyl Carbonate, Ethylhexyl Triazone, Methylpropanediol, Bis-Ethylhexyloxyphenol Methoxyphenyl Triazine, Phenylbenzimidazole Axit Sulfonic, Arginine, C20-22 Alkyl Phosphate, C20-22 Alcohols, Benzotriazolyl Dodecyl P -Cresol, Chiết xuất hạt nho Palmitoyl, Glycerin, Caprylyl Glycol, Caprylyl/Capryl Glucoside, Kali Cetyl Phosphate, Xanthan Gum, Phenylpropanol, O-Cymen-5-Ol, Polyacrylate Crosspolymer-6, Tocopheryl Acetate, Chiết xuất gỗ Picea Abies, Helianthus Annuus (Dầu hướng dương), Tocopherol.(337/004).','Nhật Bản','Body_64','Caudalie Vinosun Kem dưỡng nhẹ bảo vệ rất cao SPF50+ 40ml','40ml');
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productfeedback`
--

DROP TABLE IF EXISTS `productfeedback`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productfeedback` (
  `rating` double DEFAULT NULL,
  `customerId` bigint DEFAULT NULL,
  `feedbackDate` datetime(6) DEFAULT NULL,
  `orderId` bigint DEFAULT NULL,
  `productFeedbackId` bigint NOT NULL AUTO_INCREMENT,
  `productId` bigint DEFAULT NULL,
  `comment` text,
  `image` varchar(255) DEFAULT NULL,
  `productSnapshotName` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`productFeedbackId`),
  KEY `FKdw0e2eeny2sdo7ouc0n2vo8qf` (`productId`),
  CONSTRAINT `FKdw0e2eeny2sdo7ouc0n2vo8qf` FOREIGN KEY (`productId`) REFERENCES `product` (`productId`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productfeedback`
--

LOCK TABLES `productfeedback` WRITE;
/*!40000 ALTER TABLE `productfeedback` DISABLE KEYS */;
/*!40000 ALTER TABLE `productfeedback` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productstock`
--

DROP TABLE IF EXISTS `productstock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productstock` (
  `productId` bigint DEFAULT NULL,
  `productStockId` bigint NOT NULL AUTO_INCREMENT,
  `quantity` bigint DEFAULT NULL,
  PRIMARY KEY (`productStockId`),
  UNIQUE KEY `UK8ecffyjuirdioo81dskv8xybt` (`productId`),
  CONSTRAINT `FKdb306nyj5a44v3pqvokt4wgoe` FOREIGN KEY (`productId`) REFERENCES `product` (`productId`)
) ENGINE=InnoDB AUTO_INCREMENT=120 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productstock`
--

LOCK TABLES `productstock` WRITE;
/*!40000 ALTER TABLE `productstock` DISABLE KEYS */;
INSERT INTO `productstock` VALUES (10000,1,100),(10001,2,100),(10002,3,99),(10003,4,99),(10004,5,100);
/*!40000 ALTER TABLE `productstock` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `roleId` bigint NOT NULL AUTO_INCREMENT,
  `roleName` text,
  PRIMARY KEY (`roleId`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'ADMIN'),(2,'MANAGER'),(3,'CUSTOMER');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shippingaddress`
--

DROP TABLE IF EXISTS `shippingaddress`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shippingaddress` (
  `orderId` bigint DEFAULT NULL,
  `shippingAddressId` bigint NOT NULL AUTO_INCREMENT,
  `address` text,
  `district` text,
  `province` text,
  `receiverName` text,
  `receiverPhone` varchar(255) DEFAULT NULL,
  `ward` text,
  PRIMARY KEY (`shippingAddressId`),
  UNIQUE KEY `UK8hk7kfvpgo539i932imw4pw93` (`orderId`),
  CONSTRAINT `FK9ggy8v5dq58ay4pqgghsn4nj2` FOREIGN KEY (`orderId`) REFERENCES `order` (`orderId`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shippingaddress`
--

LOCK TABLES `shippingaddress` WRITE;
/*!40000 ALTER TABLE `shippingaddress` DISABLE KEYS */;
INSERT INTO `shippingaddress` VALUES (21,21,'Số 1, Đường 1, Phường 1','Quận 1','TP.HCM','Lê Văn An2','0387313003','Phường 1');
/*!40000 ALTER TABLE `shippingaddress` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `active` bit(1) DEFAULT NULL,
  `birthDate` date DEFAULT NULL,
  `roleId` bigint DEFAULT NULL,
  `userId` bigint NOT NULL AUTO_INCREMENT,
  `DTYPE` varchar(31) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `fullname` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `gender` enum('FEMALE','MALE') DEFAULT NULL,
  PRIMARY KEY (`userId`),
  UNIQUE KEY `UKt7gueymdut91qb606y2pyjpq0` (`email`),
  UNIQUE KEY `UKtey54ensfdq86nixhse54i7wq` (`username`),
  KEY `FK9rnxngmikvpio9qyhufq4eu3t` (`roleId`),
  CONSTRAINT `FK9rnxngmikvpio9qyhufq4eu3t` FOREIGN KEY (`roleId`) REFERENCES `role` (`roleId`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (_binary '',NULL,1,1,'Admin','admin@gmail.com','ADMINISTRATOR','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4YreOWfDX3kK-QLAbAL4ufCPc84ol2MA8Xg&s','$2a$10$qyge0EQGWRtVvOhs0/JrbuOgiFckgAebj.52NBz4J0WfI7Di.Dhxa','Admin','admin','MALE'),(_binary '',NULL,2,2,'Manager','m1@gmail.com','Nguyễn Hữu Trung','5686348e-2093-4569-918a-190ee9926875.jpg','$2a$10$qyge0EQGWRtVvOhs0/JrbuOgiFckgAebj.52NBz4J0WfI7Di.Dhxa','Lê Văn An','manager1','MALE'),(_binary '',NULL,2,3,'Manager','m2@gmail.com','Trần ','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4YreOWfDX3kK-QLAbAL4ufCPc84ol2MA8Xg&s','$2a$10$qyge0EQGWRtVvOhs0/JrbuOgiFckgAebj.52NBz4J0WfI7Di.Dhxa','Nguyễn Thị Tuyết','manager2','FEMALE'),(_binary '','2004-01-01',3,4,'Customer','tuoithokhoc1414@gmail.com','Lê Trí','bf72e2e8-fc58-4c33-ad83-bd119690e28f.png','$2a$10$9Q0dhK6ODAWwsQVFvi3JoOSW00dzXpB7aDw3yacvSz3VnBMZfaYHm','038 733 33 33','customer1','MALE'),(_binary '','2000-01-02',3,5,'Customer','customer5@gmail.com','Nguyễn Trường Vũ','d7f02965-e1a0-47c6-b290-c1b11251675e.jpeg','$2a$10$bsnbUzcChH.Oxi/U3n4Boe19c5uE1qLXdEruVu/ShTYYK5FWPiEwy','0387313400','customer2','MALE'),(_binary '','2001-01-03',3,6,'Customer','customer6@gmail.com','Lê Thi Thi','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4YreOWfDX3kK-QLAbAL4ufCPc84ol2MA8Xg&s','$2a$10$9Q0dhK6ODAWwsQVFvi3JoOSW00dzXpB7aDw3yacvSz3VnBMZfaYHm','0387313400','customer3','FEMALE'),(_binary '','2002-01-04',3,7,'Customer','customer7@gmail.com','Lê 7','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4YreOWfDX3kK-QLAbAL4ufCPc84ol2MA8Xg&s','$2a$10$qyge0EQGWRtVvOhs0/JrbuOgiFckgAebj.52NBz4J0WfI7Di.Dhxa','0387313400','customer4','FEMALE'),(_binary '','2002-01-04',3,8,'Customer','customer8@gmail.com','Lê 8','6e0834ff-c76a-45a5-9de1-2448991c2ae4.','$2a$10$Iii0Y.YNyyuMPVckaqRqU.SAfHY8upa/7J9Fsi4CZOqYAYc86zF7.','Lê Văn Châu','customer8','MALE'),(_binary '','2000-01-02',3,9,'Customer','customer9@gmail.com','Lê 9','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4YreOWfDX3kK-QLAbAL4ufCPc84ol2MA8Xg&s','$2a$10$qyge0EQGWRtVvOhs0/JrbuOgiFckgAebj.52NBz4J0WfI7Di.Dhxa','0387313400','customer11','MALE'),(_binary '','2001-01-03',3,10,'Customer','customer10@gmail.com','Lê 10','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4YreOWfDX3kK-QLAbAL4ufCPc84ol2MA8Xg&s','$2a$10$qyge0EQGWRtVvOhs0/JrbuOgiFckgAebj.52NBz4J0WfI7Di.Dhxa','0387313400','customer12','FEMALE'),(_binary '','2002-01-04',3,11,'Customer','customer11@gmail.com','Lê 11','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4YreOWfDX3kK-QLAbAL4ufCPc84ol2MA8Xg&s','$2a$10$qyge0EQGWRtVvOhs0/JrbuOgiFckgAebj.52NBz4J0WfI7Di.Dhxa','0387313400','customer13','FEMALE'),(_binary '','1990-01-05',3,14,'Customer','customer14@gmail.com','Customer14','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4YreOWfDX3kK-QLAbAL4ufCPc84ol2MA8Xg&s','$2a$10$qyge0EQGWRtVvOhs0/JrbuOgiFckgAebj.52NBz4J0WfI7Di.Dhxa','0387313017','customer14','MALE'),(_binary '','1991-01-06',3,15,'Customer','customer15@gmail.com','Customer15','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4YreOWfDX3kK-QLAbAL4ufCPc84ol2MA8Xg&s','$2a$10$qyge0EQGWRtVvOhs0/JrbuOgiFckgAebj.52NBz4J0WfI7Di.Dhxa','0387313018','customer15','FEMALE'),(_binary '','1992-01-07',3,16,'Customer','customer16@gmail.com','Customer16','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4YreOWfDX3kK-QLAbAL4ufCPc84ol2MA8Xg&s','$2a$10$qyge0EQGWRtVvOhs0/JrbuOgiFckgAebj.52NBz4J0WfI7Di.Dhxa','0387313019','customer16','MALE'),(_binary '','1993-01-08',3,17,'Customer','customer17@gmail.com','Customer17','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4YreOWfDX3kK-QLAbAL4ufCPc84ol2MA8Xg&s','$2a$10$qyge0EQGWRtVvOhs0/JrbuOgiFckgAebj.52NBz4J0WfI7Di.Dhxa','0387313020','customer17','FEMALE'),(_binary '','1994-01-09',3,18,'Customer','customer18@gmail.com','Customer18','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4YreOWfDX3kK-QLAbAL4ufCPc84ol2MA8Xg&s','$2a$10$qyge0EQGWRtVvOhs0/JrbuOgiFckgAebj.52NBz4J0WfI7Di.Dhxa','0387313021','customer18','MALE'),(_binary '','1995-01-10',3,19,'Customer','customer19@gmail.com','Customer19','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4YreOWfDX3kK-QLAbAL4ufCPc84ol2MA8Xg&s','$2a$10$qyge0EQGWRtVvOhs0/JrbuOgiFckgAebj.52NBz4J0WfI7Di.Dhxa','0387313022','customer19','FEMALE'),(_binary '','1996-01-11',3,20,'Customer','customer20@gmail.com','Customer20','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4YreOWfDX3kK-QLAbAL4ufCPc84ol2MA8Xg&s','$2a$10$qyge0EQGWRtVvOhs0/JrbuOgiFckgAebj.52NBz4J0WfI7Di.Dhxa','0387313023','customer20','MALE'),(_binary '','1997-01-12',3,21,'Customer','customer21@gmail.com','Customer21','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4YreOWfDX3kK-QLAbAL4ufCPc84ol2MA8Xg&s','$2a$10$qyge0EQGWRtVvOhs0/JrbuOgiFckgAebj.52NBz4J0WfI7Di.Dhxa','0387313024','customer21','FEMALE'),(_binary '','1998-01-13',3,22,'Customer','customer22@gmail.com','Customer22','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4YreOWfDX3kK-QLAbAL4ufCPc84ol2MA8Xg&s','$2a$10$qyge0EQGWRtVvOhs0/JrbuOgiFckgAebj.52NBz4J0WfI7Di.Dhxa','0387313025','customer22','MALE'),(_binary '','1999-01-14',3,23,'Customer','customer23@gmail.com','Customer23','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4YreOWfDX3kK-QLAbAL4ufCPc84ol2MA8Xg&s','$2a$10$qyge0EQGWRtVvOhs0/JrbuOgiFckgAebj.52NBz4J0WfI7Di.Dhxa','0387313026','customer23','FEMALE'),(_binary '','2000-01-15',3,24,'Customer','customer24@gmail.com','Customer24','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4YreOWfDX3kK-QLAbAL4ufCPc84ol2MA8Xg&s','$2a$10$qyge0EQGWRtVvOhs0/JrbuOgiFckgAebj.52NBz4J0WfI7Di.Dhxa','0387313027','customer24','MALE'),(_binary '','2001-01-16',3,25,'Customer','customer25@gmail.com','Customer25','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4YreOWfDX3kK-QLAbAL4ufCPc84ol2MA8Xg&s','$2a$10$qyge0EQGWRtVvOhs0/JrbuOgiFckgAebj.52NBz4J0WfI7Di.Dhxa','0387313028','customer25','FEMALE'),(_binary '','2002-01-25',3,39,'Customer','customer39@gmail.com','Customer39','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4YreOWfDX3kK-QLAbAL4ufCPc84ol2MA8Xg&s','$2a$10$qyge0EQGWRtVvOhs0/JrbuOgiFckgAebj.52NBz4J0WfI7Di.Dhxa','0387313037','customer39','MALE'),(_binary '','2003-01-26',3,40,'Customer','customer40@gmail.com','Customer40','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4YreOWfDX3kK-QLAbAL4ufCPc84ol2MA8Xg&s','$2a$10$qyge0EQGWRtVvOhs0/JrbuOgiFckgAebj.52NBz4J0WfI7Di.Dhxa','0387313038','customer40','FEMALE'),(_binary '','1990-02-20',3,41,'Customer','customer41@gmail.com','Full Name 41','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4YreOWfDX3kK-QLAbAL4ufCPc84ol2MA8Xg&s','$2a$10$qyge0EQGWRtVvOhs0/JrbuOgiFckgAebj.52NBz4J0WfI7Di.Dhxa','0387313039','customer41','FEMALE'),(_binary '','1992-03-15',3,42,'Customer','customer42@gmail.com','Full Name 42','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4YreOWfDX3kK-QLAbAL4ufCPc84ol2MA8Xg&s','$2a$10$qyge0EQGWRtVvOhs0/JrbuOgiFckgAebj.52NBz4J0WfI7Di.Dhxa','0387313040','customer42','MALE'),(_binary '','1994-04-10',3,43,'Customer','customer43@gmail.com','Full Name 43','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4YreOWfDX3kK-QLAbAL4ufCPc84ol2MA8Xg&s','$2a$10$qyge0EQGWRtVvOhs0/JrbuOgiFckgAebj.52NBz4J0WfI7Di.Dhxa','0387313041','customer43','FEMALE'),(_binary '','1996-05-05',3,44,'Customer','customer44@gmail.com','Full Name 44','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4YreOWfDX3kK-QLAbAL4ufCPc84ol2MA8Xg&s','$2a$10$qyge0EQGWRtVvOhs0/JrbuOgiFckgAebj.52NBz4J0WfI7Di.Dhxa','0387313042','customer44','MALE'),(_binary '','1998-06-01',3,45,'Customer','customer45@gmail.com','Full Name 45','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4YreOWfDX3kK-QLAbAL4ufCPc84ol2MA8Xg&s','$2a$10$qyge0EQGWRtVvOhs0/JrbuOgiFckgAebj.52NBz4J0WfI7Di.Dhxa','0387313043','customer45','FEMALE'),(_binary '','1989-07-12',3,46,'Customer','customer46@gmail.com','Full Name 46','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4YreOWfDX3kK-QLAbAL4ufCPc84ol2MA8Xg&s','$2a$10$qyge0EQGWRtVvOhs0/JrbuOgiFckgAebj.52NBz4J0WfI7Di.Dhxa','0387313044','customer46','MALE'),(_binary '','1991-08-18',3,47,'Customer','customer47@gmail.com','Full Name 47','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4YreOWfDX3kK-QLAbAL4ufCPc84ol2MA8Xg&s','$2a$10$qyge0EQGWRtVvOhs0/JrbuOgiFckgAebj.52NBz4J0WfI7Di.Dhxa','0387313045','customer47','FEMALE'),(_binary '','1993-09-22',3,48,'Customer','customer48@gmail.com','Full Name 48','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4YreOWfDX3kK-QLAbAL4ufCPc84ol2MA8Xg&s','$2a$10$qyge0EQGWRtVvOhs0/JrbuOgiFckgAebj.52NBz4J0WfI7Di.Dhxa','0387313046','customer48','MALE'),(_binary '','1995-10-26',3,49,'Customer','customer49@gmail.com','Full Name 49','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4YreOWfDX3kK-QLAbAL4ufCPc84ol2MA8Xg&s','$2a$10$qyge0EQGWRtVvOhs0/JrbuOgiFckgAebj.52NBz4J0WfI7Di.Dhxa','0387313047','customer49','FEMALE'),(_binary '','1997-11-30',3,50,'Customer','customer50@gmail.com','Full Name 50','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4YreOWfDX3kK-QLAbAL4ufCPc84ol2MA8Xg&s','$2a$10$qyge0EQGWRtVvOhs0/JrbuOgiFckgAebj.52NBz4J0WfI7Di.Dhxa','0387313048','customer50','MALE'),(_binary '',NULL,3,51,'Customer','dinhtri42@gmail.com','DinhTri Le',NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `voucher`
--

DROP TABLE IF EXISTS `voucher`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `voucher` (
  `used` bit(1) DEFAULT NULL,
  `voucherValue` double DEFAULT NULL,
  `endDate` datetime(6) DEFAULT NULL,
  `orderId` bigint DEFAULT NULL,
  `startDate` datetime(6) DEFAULT NULL,
  `voucherId` bigint NOT NULL AUTO_INCREMENT,
  `voucherCode` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`voucherId`),
  UNIQUE KEY `UK6ks00usgukvbm5eg2l23uowur` (`orderId`),
  CONSTRAINT `FK6k46qkt4c4liskyprampyggxm` FOREIGN KEY (`orderId`) REFERENCES `order` (`orderId`)
) ENGINE=InnoDB AUTO_INCREMENT=557 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `voucher`
--

LOCK TABLES `voucher` WRITE;
/*!40000 ALTER TABLE `voucher` DISABLE KEYS */;
/*!40000 ALTER TABLE `voucher` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'cosmeticsshop2'
--

--
-- Dumping routines for database 'cosmeticsshop2'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-19 23:06:09
