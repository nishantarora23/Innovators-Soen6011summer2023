CREATE DATABASE soen6011;

CREATE TABLE `soen6011`.`users` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `FULLNAME` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `USERNAME` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `PASSWORD` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `USER_ROLE` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `ROLE_ID` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `EMAIL` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `ADDRESS` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `DOB` date DEFAULT NULL,
  `COMPANY_NAME` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `COLLEGE_NAME` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `soen6011`.`users` VALUES (1,'Sam Smith','sam','sam@1234','Student','D561344','sam26@gmail.com','1998 Boul De Maisoneuve Montreal','1997-03-09','Null','Concordia University'),(2,'Gustavo Fring','gusFring09','gus@1234','Employer','S341344','gustavo.fring@gmail.com','123 Driver Lane','1975-10-22','Amazon','Null'),(3,'Sam Smith','samSmith08','sam@1234','Student','D561344','sam26@gmail.com','1998 Boul De Maisoneuve Montreal','1997-03-09','Null','Concordia University'),(4,'Gustavo Fring','gusFring09','gus@1234','Employer','S341344','gustavo.fring@gmail.com','123 Driver Lane','1975-10-22','Amazon','Null'),(5,'Patt Cummins','admin','admin','Admin','S341344','patt.cummins@gmail.com','1645 Du Parc','1985-10-22','Null','Null'),(6,'Merlin Abraham','merlin','12','Student',NULL,'mer@gmail.com','1890','2023-07-20','','Concordia'),(7,'Mer','CompanyA','45','Employer',NULL,'mer@gmail.com','45','2023-07-20','ABC',''),(8,'Nishant','nishant','45','Student',NULL,'nish@gmail.com','789','2023-07-20','','kljkl'),(9,'Nishant Arora','nishant','arora','Student',NULL,'aroranish23@gmail.com','1975 Boulevard De Maisonneuve Ouest','2023-07-20','','Concordia University'),(10,'Nishant Arora','nishantarora','arora','Student',NULL,'aroranish23@gmail.com','1975 Boulevard De Maisonneuve Ouest','2023-07-20','','Concordia University');

CREATE TABLE `soen6011`.`jobs` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `TITLE` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `SALARY_RANGE` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `RESPONSIBILITIES` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `QUALIFICATIONS` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `LOCATION` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `DESCRIPTION` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `DEADLINE` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `CONTRACT_TYPE` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `EMPLOYER` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `STATUS` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'active',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `soen6011`.`jobs` VALUES (1,'Software Engineer','USD 80,000 - 100,000','Develop and maintain software applications','Bachelor\'s degree in Computer Science or related field','New York','We are seeking a skilled Software Engineer to join our team...','2023-08-31','Full-time','ABC Technologies','active'),(2,'Marketing Specialist','USD 60,000 - 75,000','Plan and execute marketing campaigns','Bachelor\'s degree in Marketing or equivalent','San Francisco','We are looking for a creative Marketing Specialist...','2023-09-15','Contract','XYZ Marketing Agency','active'),(3,'Data Analyst','USD 70,000 - 90,000','Analyze and interpret data for insights','Bachelor\'s degree in Statistics or related field','Chicago','Join our Data Analytics team as a Data Analyst...','2023-08-25','Part-time','Data Insights Inc.','active'),(4,'Sales Representative','USD 50,000 - 65,000','Promote and sell company products','High school diploma required; Sales experience preferred','Los Angeles','We are hiring Sales Representatives to expand our market...','2023-09-10','Full-time','Sales Pro Solutions','active'),(5,'Graphic Designer','USD 55,000 - 70,000','Create visually appealing designs for clients','Bachelor\'s degree in Graphic Design or related field','London','Looking for a talented Graphic Designer to join our creative team...','2023-08-20','Full-time','Designs R Us','active');
