#!/bin/sh
# Script gets image from google with a word
# Usage: wti.sh <word>
# Example: wti.sh cat
word=$1
index=$2
if [ -z $word ]; then
    echo "Usage: wti.sh <word>"
    exit 1
fi
if [ -z $index ]; then
    #random between 0 and 9
    index=$(($RANDOM % 10))
fi

word="echo #wallpaper $word | sed 's/ /+/g'"

# Get image url
IMAGE_LINK=$((curl -s -A "Mozilla/5.0" -L deviantart.com/search?q=$word | sed 's/</\n</g' | grep '<a data-hook="deviation_link"' | sed -E 's/^.*href=\"([^\"]+)\".*$/\1/mg | head -n $index | tail -n 1'))

# Get image
REAL_IMAGE_LINK=$((curl -s -A "Mozilla/5.0" -L $IMAGE_LINK | sed 's/</\n</g' | grep '<img alt="' | sed -E 's/^.*src=\"([^\"]+)\".*$/\1/mg' | head -n 1))
wget --user-agent "Mozilla/5.0" -O wallpaper.jpg $REAL_IMAGE_LINK
feh --bg-scale wallpaper.jpg