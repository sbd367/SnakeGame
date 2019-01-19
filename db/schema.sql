CREATE DATABASE snakeGame; 
USE snakeGame;

CREATE TABLE user_score 
(
    id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(255),
    score INT NOT NULL,
    PRIMARY KEY(id)
);