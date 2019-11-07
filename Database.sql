CREATE DATABASE `db_helbouaz`;
USE `db_helbouaz`;
CREATE TABLE `users`
(
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `username` VARCHAR(50) NOT NULL,
    `password` VARCHAR(257) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `firstname` VARCHAR(50) NOT NULL,
    `lastname` VARCHAR(50) NOT NULL,
    `gender` VARCHAR(50) NOT NULL,
    `age` INT NOT NULL,
    `activated` INT DEFAULT 0,
    `latitude` DOUBLE NOT NULL DEFAULT 0,
    `longitude` DOUBLE NOT NULL DEFAULT 0,
    `bio` VARCHAR(200) NOT NULL DEFAULT 'No bio yet.',
    `is_online` INT NOT NULL DEFAULT FALSE,
    `last_connection` DATETIME DEFAULT NOW(),
    `fame_rating` DOUBLE NOT NULL DEFAULT 0,
    `orientation` VARCHAR(50) NOT NULL DEFAULT 'both'
);

CREATE TABLE `tags`
(
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `tagname` VARCHAR(100) NOT NULL
);

CREATE TABLE `usertags`
(
    `userid` INT NOT NULL,
    `tagid` INT NOT NULL,
    UNIQUE(userid, tagid)
);

CREATE TABLE `relations`
(
    `primaryuser` INT NOT NULL,
    `secondaryuser` INT NOT NULL,
    `relation` INT NOT NULL,
    UNIQUE(primaryuser, secondaryuser)
);

CREATE TABLE `matches`
(
    `user1` INT NOT NULL,
    `user2` INT NOT NULL,
    UNIQUE(user1, user2)
);

CREATE TABLE `messages`
(
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `sender` INT NOT NULL,
    `receiver` INT NOT NULL,
    `date` DATETIME DEFAULT NOW(),
    `message` TINYTEXT NOT NULL
);

CREATE TABLE `notifications`
(
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `userid` INT NOT NULL,
    `date` DATETIME DEFAULT NOW(),
    `content` TINYTEXT NOT NULL,
    `read` INT NOT NULL DEFAULT 0
);

CREATE TABLE `block`
(
    `user1` INT NOT NULL,
    `user2` INT NOT NULL,
    UNIQUE(user1, user2)
);

CREATE TABLE `history`
(
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `user` INT NOT NULL,
    `invoker` INT NOT NULL,
    `content` TINYTEXT NOT NULL,
    `date` DATETIME DEFAULT NOW()
);

CREATE TABLE `images`
(
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `user` INT NOT NULL,
    `path` TINYTEXT NOT NULL,
    `date` DATETIME DEFAULT NOW()
);

CREATE TABLE `reports`
(
    `user1` INT NOT NULL,
    `user2` INT NOT NULL,
    UNIQUE(user1, user2)
);