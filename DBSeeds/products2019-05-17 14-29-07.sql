USE ozone_online_retailer;

CREATE TABLE `products` (
  `item_id` int(10) NOT NULL AUTO_INCREMENT,
  `product_name` varchar(40) DEFAULT NULL,
  `department_name` varchar(20) DEFAULT NULL,
  `price` int(10) DEFAULT NULL,
  `QTY_in_stock` int(9) DEFAULT NULL,
  `product_sales` int(12) DEFAULT NULL,
  `department_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`item_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


INSERT INTO `ozone_online_retailer`.`products`(`item_id`,`product_name`,`price`,`QTY_in_stock`,`product_sales`,`department_id`) VALUES (1,'beulah valley goat''s milk-1Gal',1093,50,31697,1);
INSERT INTO `ozone_online_retailer`.`products`(`item_id`,`product_name`,`price`,`QTY_in_stock`,`product_sales`,`department_id`) VALUES (2,'air jordan sneakers',29999,100,4230759,2);
INSERT INTO `ozone_online_retailer`.`products`(`item_id`,`product_name`,`price`,`QTY_in_stock`,`product_sales`,`department_id`) VALUES (3,'Giant Steps by John Coltrane',1999,10,179910,3);
INSERT INTO `ozone_online_retailer`.`products`(`item_id`,`product_name`,`price`,`QTY_in_stock`,`product_sales`,`department_id`) VALUES (4,'Agarbatti Nag Champa',299,250,29601,4);
INSERT INTO `ozone_online_retailer`.`products`(`item_id`,`product_name`,`price`,`QTY_in_stock`,`product_sales`,`department_id`) VALUES (5,'The Matrix Reloaded',1999,100,39980,5);
INSERT INTO `ozone_online_retailer`.`products`(`item_id`,`product_name`,`price`,`QTY_in_stock`,`product_sales`,`department_id`) VALUES (6,'Ray Bans',3500,50,357723,6);
INSERT INTO `ozone_online_retailer`.`products`(`item_id`,`product_name`,`price`,`QTY_in_stock`,`product_sales`,`department_id`) VALUES (7,'Party Chair',1000,0,10000,7);
INSERT INTO `ozone_online_retailer`.`products`(`item_id`,`product_name`,`price`,`QTY_in_stock`,`product_sales`,`department_id`) VALUES (9,'Smorgasbord',10000,50,1000000,8);
INSERT INTO `ozone_online_retailer`.`products`(`item_id`,`product_name`,`price`,`QTY_in_stock`,`product_sales`,`department_id`) VALUES (10,'Sheet Music',1000,10,90000,9);
