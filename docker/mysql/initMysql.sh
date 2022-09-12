#!/bin/bash
<<INFO
DESCRIBE:初始化Mysql 导入sql
INFO

mysql -u root -p123456 <<EOF
CREATE DATABASE localTest;
use localTest;
source /var/data/localTest.sql;
EOF
echo "初始化成功"