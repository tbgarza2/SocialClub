-- mysql -u root < schema.sql

DROP DATABASE IF EXISTS socialclub;

CREATE DATABASE socialclub;

USE socialclub;

CREATE TABLE `users` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(20) ,
  `email` varchar(40) UNIQUE
); 

CREATE TABLE `events` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(20),
  `time` varchar(20),
  `category_id` int,
  `category` varchar(20),
  `address` varchar(50),
  `creator_id` int,
  `summary` varchar(244),
  `roomID` varchar(20)
);

CREATE TABLE `status` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `status` varchar(20)
);

CREATE TABLE `rsvp` (
  `user_id` int(10) NOT NULL,
  `event_id` int(10) NOT NULL,
  PRIMARY KEY (`user_id`,`event_id`),
  CONSTRAINT `FK_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `FK_events` FOREIGN KEY (`event_id`) REFERENCES  `events`(`id`)
);

CREATE TABLE `categories` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(20)
);

CREATE TABLE `message` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `created_at` TIMESTAMP,
  `id_sender` int NOT NULL,
  `id_recipient` int NOT NULL,
  `message` varchar(255)
);


ALTER TABLE `events` ADD FOREIGN KEY (`creator_id`) REFERENCES `users` (`id`);

ALTER TABLE `message` ADD FOREIGN KEY (`id_sender`) REFERENCES `users` (`id`);

ALTER TABLE `message` ADD FOREIGN KEY (`id_recipient`) REFERENCES `users` (`id`);

INSERT INTO `categories` VALUES (null, "Social");
INSERT INTO `categories` VALUES (null, "Gaming");
INSERT INTO `categories` VALUES (null, "Food");
INSERT INTO `categories` VALUES (null, "Sports");
INSERT INTO `categories` VALUES (null, "Music");
INSERT INTO `categories` VALUES (null, "Dance");