#!/bin/bash
<<INFO
DESCRIBE:初始化Mysql 导入sql
INFO

mysql -u root -p123456 <<EOF
CREATE DATABASE localTest;
use localTest;
source /var/data/localTest.sql;
CREATE USER 'mr'@'%' IDENTIFIED WITH mysql_native_password BY 'mr';
GRANT ALL PRIVILEGES ON *.* TO 'mr'@'%' WITH GRANT OPTION; 
FLUSH PRIVILEGES;
EOF
echo "初始化MYSQL成功"