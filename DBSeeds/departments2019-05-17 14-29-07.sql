USE ozone_online_retailer;

CREATE TABLE `departments` (
  `department_id` int(11) NOT NULL AUTO_INCREMENT,
  `department_name` varchar(25) DEFAULT NULL,
  `over_head_costs` int(10) DEFAULT NULL,
  PRIMARY KEY (`department_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


INSERT INTO `ozone_online_retailer`.`departments`(`department_id`,`department_name`,`over_head_costs`) VALUES (1,'food',100000);
INSERT INTO `ozone_online_retailer`.`departments`(`department_id`,`department_name`,`over_head_costs`) VALUES (2,'shoes',150000);
INSERT INTO `ozone_online_retailer`.`departments`(`department_id`,`department_name`,`over_head_costs`) VALUES (3,'records',125000);
INSERT INTO `ozone_online_retailer`.`departments`(`department_id`,`department_name`,`over_head_costs`) VALUES (4,'incense',8000);
INSERT INTO `ozone_online_retailer`.`departments`(`department_id`,`department_name`,`over_head_costs`) VALUES (5,'videos',15000);
INSERT INTO `ozone_online_retailer`.`departments`(`department_id`,`department_name`,`over_head_costs`) VALUES (6,'Sunglasses',10000);
INSERT INTO `ozone_online_retailer`.`departments`(`department_id`,`department_name`,`over_head_costs`) VALUES (7,'furniture',250000);
INSERT INTO `ozone_online_retailer`.`departments`(`department_id`,`department_name`,`over_head_costs`) VALUES (8,'Cutlery',25000);
INSERT INTO `ozone_online_retailer`.`departments`(`department_id`,`department_name`,`over_head_costs`) VALUES (9,'Books',37000);
INSERT INTO `ozone_online_retailer`.`departments`(`department_id`,`department_name`,`over_head_costs`) VALUES (10,'Electronics',100000);
