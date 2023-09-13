Steps:
1. Install MySQL and run this:
CREATE DATABASE test

USE test
CREATE TABLE User (
	UserId INT AUTO_INCREMENT PRIMARY KEY,
    FirstName VARCHAR(15),
    LastName VARCHAR(15),
    Email VARCHAR(50),
    Phone VARCHAR(50)
);
CREATE TABLE Agent (
	AgentId INT AUTO_INCREMENT PRIMARY KEY,
    FirstName VARCHAR(15),
    LastName VARCHAR(15),
    Email VARCHAR(50),
    Password VARCHAR(50),
    Phone VARCHAR(50),
    Active bool
);
CREATE TABLE Issue (
	IssueId INT AUTO_INCREMENT PRIMARY KEY,
    Message VARCHAR(10000),
    Created DATETIME,
    UserX INT, 
    FOREIGN KEY (UserX) REFERENCES User(UserId),
    
    AgentX INT, 
    FOREIGN KEY (AgentX) REFERENCES Agent(AgentId),
    
    Finished bool
);
2. 
