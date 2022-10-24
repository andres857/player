#!/bin/bash
export DISPLAY=:0 
unclutter -idle 0 &

SCRIPT=~/player/app.js 
# Absolute path to output log file
LOG=~/player/player.log
echo -e "\n####### STARTUP $(date) ######\n" >> $LOG
sleep 10
$SCRIPT >> $LOG 2>&1