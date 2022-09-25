#!/bin/bash
<<INFO
DESCRIBE:初始化Elaticseatch 初始化索引
INFO

curl -XPUT -H "Content-Type: application/json" http://localhost:9200/character -d @mapping.json

echo "初始化Elasticsearch成功"