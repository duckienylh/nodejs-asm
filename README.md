# API
#### API project _Building a Node.js/JavaScript RESTFUL API_ :
* * *
## Prerequisites
* Install Docker.
* Install Docker Compose.
* Install Nodejs (This project is built at node version: **20.11.1**).

## Running Project
1. Create file .env with following content then copy to root folder **_`nodejs-asm`_**
```shell
NODE_ENV=development

# Admin server configuration
SERVER_HOST=localhost
SERVER_PORT=4000
SECRET=super-secret-12345678900

# Database configuration
MYSQL_USER=admin
MYSQL_PASSWORD=12345678900
MYSQL_NAME=db
MYSQL_PORT=3306
MYSQL_HOST=mysql-db

```
2. Form folder `nodejs-asm/server` run command install packages by:
```shell
npm install
```
3. From project folder run command (For sync database):
```shell
SYNC_DATA=true docker-compose up -d --build
```
4. From project folder run command :
```shell
docker-compose up -d --build
```
