-- Execute the following command on terminal to create database and table:

CREATE DATABASE deskree

CREATE TABLE `users`
(
  `id`            INT(11) NOT NULL auto_increment ,
  `name`          VARCHAR(50) COLLATE utf8mb4_unicode_ci NOT NULL ,
  `email`         VARCHAR(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password`      VARCHAR(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_login`    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_at`    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ,
  `updated_at`    DATETIME on UPDATE CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ,
  PRIMARY KEY (id),
  UNIQUE KEY email (email)
 ) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

 CREATE TABLE `coffee`
(
  `id`             INT(11) NOT NULL auto_increment ,
  `title`          VARCHAR(150) COLLATE utf8mb4_unicode_ci NOT NULL ,
  `description`    VARCHAR(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image`          VARCHAR(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ingredients`    VARCHAR(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at`     DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ,
  `updated_at`     DATETIME on UPDATE CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ,
  PRIMARY KEY (id)
 ) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
