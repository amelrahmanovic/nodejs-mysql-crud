Steps:
* Install docker "https://www.docker.com/"
* Run docker and search 'mysql' ---> Tag=8.0 ---> Pull ---> Images find Name: mysql and go run ---> Optional settings Container name: mysql, Variable:MYSQL_ROOT_PASSWORD, Value=root
* Download MySQL Workbench https://dev.mysql.com/downloads/workbench/ & install & open ---> MySQL Connections + ---> Connection Name: Local Docker, Hostname: 127.0.0.1, Port: 3306 or see in docker port of MySQL Server, Store in Vault ... ---> Password: root , OK ---> Test Connection and if Message is: Successfully made the MySQL connection click OK ---> Close ---> Duble click on 'Local Docker'.
* Copy SQL script and run 'click on storm', "https://github.com/amelrahmanovic/nodejs-mysql-crud/blob/main/SQL/script.sql"
