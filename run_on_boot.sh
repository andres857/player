#!/bin/bash
export DISPLAY=:0 
sleep 1
pcmanfm --set-wallpaper ~/player/wallpapper.jpg
unclutter -idle 0 &
SCRIPT=~/player/app.js 
# Absolute path to output log file
LOG=~/player/player.log
echo -e "\n####### STARTUP $(date) ######\n" >> $LOG
$SCRIPT >> $LOG 2>&1
