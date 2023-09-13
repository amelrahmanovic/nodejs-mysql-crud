Steps:
* Install docker "https://www.docker.com/"
* Run docker and search 'mysql' ---> Tag=8.0 ---> Pull ---> Images find Name: mysql and go run ---> Optional settings Container name: mysql, Variable:MYSQL_ROOT_PASSWORD, Value=root
* Download MySQL Workbench https://dev.mysql.com/downloads/workbench/ & install & open ---> MySQL Connections + ---> Connection Name: Local Docker, Hostname: 127.0.0.1, Port: 3306 or see in docker port of MySQL Server, Store in Vault ... ---> Password: root , OK ---> Test Connection and if Message is: Successfully made the MySQL connection click OK ---> Close ---> Duble click on 'Local Docker'.
* Copy SQL script and run 'click on storm'.
"
CREATE DATABASE test;

USE test;
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
INSERT INTO User (FirstName, LastName, Email, Phone) VALUES ('a', 'a', 'a@a.a', '+381656020432');
INSERT INTO User (FirstName, LastName, Email, Phone) VALUES ('b', 'b', 'b@a.a', '+381656020433');
INSERT INTO User (FirstName, LastName, Email, Phone) VALUES ('c', 'c', 'c@a.a', '+381656020434');

INSERT INTO Agent (FirstName, LastName, Email, Password, Phone, Active) VALUES ('c', 'c', 'c@a.a', 'pw1', '+381656020435', 1);
INSERT INTO Agent (FirstName, LastName, Email, Password, Phone, Active) VALUES ('b', 'b', 'b@a.a', 'pw2', '+381656020436', 1);
INSERT INTO Agent (FirstName, LastName, Email, Password, Phone, Active) VALUES ('a', 'a', 'a@a.a', 'pw3', '+381656020437', 1);

INSERT INTO Issue (Message, Created, UserX, AgentX, Finished) VALUES ('Test', NOW(), 1, 1, 1);
INSERT INTO Issue (Message, Created, UserX, AgentX, Finished) VALUES ('Test', NOW(), 2, 2, 1);
INSERT INTO Issue (Message, Created, UserX, AgentX, Finished) VALUES ('Test', NOW(), 3, 3, 1);
"