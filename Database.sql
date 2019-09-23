CREATE DATABASE db_helbouaz;
CREATE TABLE users
(
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `username` VARCHAR(50) NOT NULL,
    `password` VARCHAR(257) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `firstname` VARCHAR(50) NOT NULL,
    `lastname` VARCHAR(50) NOT NULL,
    `gender` VARCHAR(50),
    `age` INT,
    `activated` INT DEFAULT 0,
    `latitude` DOUBLE,
    `longitude` DOUBLE,
    `bio` VARCHAR(200)

);

CREATE TABLE tags
(
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `tagname` VARCHAR(100) NOT NULL
);

CREATE TABLE usertags
(
    `userid` INT NOT NULL,
    `tagid` INT NOT NULL,
    UNIQUE(userid, tagid)
);

CREATE TABLE relations
(
    `primaryuser` INT NOT NULL,
    `secondaryuser` INT NOT NULL,
    `relation` INT NOT NULL,
    UNIQUE(primaryuser, secondaryuser)
);

CREATE TABLE matches
(
    `user1` INT NOT NULL,
    `user2` INT NOT NULL,
    UNIQUE(user1, user2)
)

CREATE TABLE messages
(
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `sender` INT NOT NULL,
    `receiver` INT NOT NULL,
    `date` DATETIME DEFAULT NOW(),
    `message` TINYTEXT NOT NULL
)