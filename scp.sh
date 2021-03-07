#! /bin/bash
npm run build

scp -r .vuepress/dist root@120.27.22.44:/root/webservice/code/study
