#!/bin/bash
export DISPLAY=:0 
sleep 1
wg-quick up wg0
sleep 10
pcmanfm --set-wallpaper ~/player/wallpapper.jpg
unclutter -idle 0 &
SCRIPT=~/player/app.js 
# Absolute path to output log file
LOG=~/player/player.log
echo -e "\n####### STARTUP $(date) ######\n" >> $LOG
$SCRIPT >> $LOG 2>&1
