CREATE DATABASE soen6011;

CREATE TABLE `soen6011`.`users` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `FULLNAME` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `USERNAME` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `PASSWORD` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `USER_ROLE` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ROLE_ID` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `EMAIL` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ADDRESS` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `DOB` date DEFAULT NULL,
  `COMPANY_NAME` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `COLLEGE_NAME` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`ID`)
);
INSERT INTO `soen6011`.`users`
(`FULLNAME`,`USERNAME`,`PASSWORD`,`USER_ROLE`,`ROLE_ID`,`EMAIL`,`ADDRESS`,`DOB`,
`COMPANY_NAME`,`COLLEGE_NAME`)
VALUES
('Sam Smith','samSmith08','sam@1234','Student','D561344','sam26@gmail.com','1998 Boul De Maisoneuve Montreal',
'1997-03-09','Null','Concordia University'),
('Gustavo Fring','gusFring09','gus@1234','Employer','S341344','gustavo.fring@gmail.com','123 Driver Lane',
'1975-10-22','Amazon','Null');
('Patt Cummins','patt10','patt@1234','Admin','S341344','patt.cummins@gmail.com','1645 Du Parc',
'1985-10-22','Null','Null');