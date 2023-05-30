#!/bin/sh
# Script gets motd from github

#motd url
url="https://raw.githubusercontent.com/Pivouane/urban-eureka/main/motd.txt"

# get number of lines in motd
num_lines=$(($(curl -s -H 'Cache-Control: no-cache, no-store' $url | wc -l) + 1))

# get days from time since epoch
days=$(($(date +%s) / 86400))

# get line number to print from days
line_num=$(($days % $num_lines))

# print line
curl -s $url | sed -n "$line_num"p
