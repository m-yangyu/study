#! /bin/bash
git add .

git commit -m "添加leetcode"

git push origin master

npm run build

scp -r .vuepress/dist root@120.27.22.44:/root/webservice/code/study
