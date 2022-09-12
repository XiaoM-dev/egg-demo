#!/bin/bash
<<INFO
AUTHOR:anqixiang
DATE:2021-06-24
DESCRIBE:初始化Mysql,如创建用户、schema、授权、导入sql
SYSTEM:CentOS7/RedHat7
WARNING:
MODIFY:
INFO

set -e

MYSQL_IP=$1
MYSQL_PORT=$2
MYSQL_ADMIN_USER=$3         #Mysql管理员用户，通常为root
MYSQL_ADMIN_PWD=$4
MYSQL_CMD="mysql -h${MYSQL_IP} -P${MYSQL_PORT} -u${MYSQL_ADMIN_USER} -p${MYSQL_ADMIN_PWD}"

#环境检查
Check_Env(){
    echo "INFO:Begin Check Env..."
    if ! command -v mysql &> /dev/null;then
        echo "ERROR:Please Install Mysql Client"  && exit 1
    fi
    if ! echo ${MYSQL_IP} | grep -o '[0-9]\{1,3\}\.[0-9]\{1,3\}\.[0-9]\{1,3\}\.[0-9]\{1,3\}' &> /dev/null;then
        echo  "ERROR:${MYSQL_IP}不合法!!!" && exit 1
    fi
    if ! ${MYSQL_CMD} -e 'show databases;' &> /dev/null;then
        echo "ERROR:${MYSQL_IP} Database Access Fail" && exit 1
    fi
}

#创建Mysql用户
Create_User(){
    [[ $# -eq 0 ]] && echo "ERROR:User Info Is Null,Please Excute:bash $0 -h" && exit 1
    for info in $@
    do
        local info_array=(${info//:/ })
        if [[ ${#info_array[*]} -ne 2 ]];then
            echo "ERROR:${info} Format Error,Please Excute:bash $0 -h" && exit 1
        fi
        local mysql_user=${info_array[0]}
        local mysql_pwd=${info_array[1]}
        echo "INFO:Begin Create Mysql User ${mysql_user}..."
        ${MYSQL_CMD} -e "create USER if NOT EXISTS '${mysql_user}'@'%' identified by '${mysql_pwd}';"
    done
}

#创建schema
Create_Schema(){
    [[ $# -eq 0 ]] && echo "ERROR:Schema Is Null,Please Excute:bash $0 -h" && exit 1
    for mysql_schema in $@
    do
        echo "INFO:Begin Create Mysql Schema ${mysql_schema}..."
        ${MYSQL_CMD} -e "create SCHEMA if NOT EXISTS ${mysql_schema} default character set utf8mb4 collate utf8mb4_bin;"
    done
}

#给用户授权
Grant_User(){
    [[ $# -eq 0 ]] && echo "ERROR:User Info Is Null,Please Excute:bash $0 -h" && exit 1
    for info in $@
    do
        local info_array=(${info//:/ })
        if [[ ${#info_array[*]} -ne 2 ]];then
            echo "ERROR:${info} Format Error,Please Excute:bash $0 -h" && exit 1
        fi
        local schema_name=${info_array[0]}
        local mysql_user=${info_array[1]}
        echo "INFO:Begin grant schema ${schema_name} to Mysql User ${mysql_user}..."
        ${MYSQL_CMD} -e "grant ALL on ${schema_name}.* to '${mysql_user}'@'%';"
    done
}

#导入sql
Import_Sql(){
    [[ $# -ne 5 ]] && echo "ERROR:Invalid Param!!!,Please Excute:bash $0 -h" && exit 1
    local mysql_user=$1
    local mysql_pwd=$2
    local mysql_schema=$3
    local jfrog_user_info=$4
    local sql_url=$5
    curl -u ${jfrog_user_info} -O ${sql_url}
    local sql_name=$(echo ${sql_url##*/})
    echo "INFO:Begin Import ${sql_name} Sql To Schema ${mysql_schema} On Mysql User ${mysql_user}..."
    mysql -h${MYSQL_IP} -P${MYSQL_PORT} -u${mysql_user} -p${mysql_pwd} ${mysql_schema} < ${sql_name}
}

#帮助文档
Help(){
    cat << EOF
Usage: 
    bash $0 IP 端口 Mysql管理员用户名 密码 -c
WARNING:
    当传入的位置参数使用冒号(:)分隔时,冒号两边的值不能包含冒号(:)
=======================================================================
optional arguments:
	-h	提供帮助信息
	-c	进行创建的相关操作
        user    创建Mysql用户,格式：-c user 用户1:密码1 用户2:密码2，如-c user user1:pwd1 user2:pwd2
        schema  创建schema，格式：-c schema schema1 schema2
        grant   授权，格式：-c grant schema名字1:mysql用户名1 schema名字1:mysql用户名1
        import  导入sql,格式：-c import mysql用户名 密码 schema名字 jfrog用户名:密码 sql的url
EXAMPLE:
	bash $0 192.168.2.1 3306 root 123456-c user user1:pwd1 user2:pwd2
EOF
}

######################主程序######################
[[ "x$1" == "x-h" ]] && Help && exit 0
[[ $# -le 5 ]] && echo "ERROR:Invalid Param!!!,Please Excute:bash $0 -h" && exit 1
Check_Env
if [[ "x$5" == "x-c" ]];then
    shift 5
    case $1 in
    user)
        shift 1
        Create_User $@;;
    schema)
        shift 1
        Create_Schema $@;;
    grant)
        shift 1
        Grant_User $@;;
    import)
         shift 1
         Import_Sql $@;;
    *)
        echo "ERROR:Invalid Param!!!,Please Excute:bash $0 -h" && exit 1
    esac
else
    echo "Help" && exit 1
fi
