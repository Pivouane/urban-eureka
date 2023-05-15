#!/bin/sh
# Script gets motd from github and downloads an image related from the internet

# Get the motd from github
wget -q https://raw.githubusercontent.com/Pivouane/urban-eureka/main/motd.txt -O /etc/motd

# get number of lines in motd
num_lines=$(wc -l /etc/motd | awk '{print $1}')

# get days from time since epoch
days=$(($(date +%s) / 86400))

# get line number to print from days
line_num=$(($days % $num_lines))

# print line
sed -n "$line_num"p /etc/motd