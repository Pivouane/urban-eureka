#!/bin/sh
# Script gets motd from github and downloads an image related from the internet

#motd url
url="https://raw.githubusercontent.com/Pivouane/urban-eureka/main/motd.txt"

# get number of lines in motd
num_lines=$(curl -s $url | wc -l)


# get days from time since epoch
days=$(($(date +%s) / 86400))

# get line number to print from days
line_num=$(($days % $num_lines + 1))

# print line
curl -s $url | sed -n "$line_num"p
