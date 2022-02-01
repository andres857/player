require('dotenv').config({ path: '/home/pi/player/.env'})
const {getdatastremingplayer,restartPlayer} = require('./mediaplayer')
const {streaming} = require('../streaming')
const moment = require('moment')
const checktime = process.env.PLAYERCHECKTIME * 1000

let statusMediaPlayer = true;
let previousvalue = 0; 
let lostConnectionCountIntervalTime = 0; 
let attempsConnectEncoder = 0;

// evaluate if the player media is playing .... 
function playingPlayer(){
    setInterval(()=>{
        let currentValue = getdatastremingplayer()
        if ( currentValue == previousvalue || currentValue == true){
            console.log(`${moment().format('MMMM Do YYYY, h:mm:ss a')} : El reproductor se detuvo ${statusMediaPlayer}: valor anterior: ${previousvalue} || valor actual ${currentValue}`);    
            lostConnectionCount = lostConnectionCount + 1

            if(lostConnectionCount >= 10){
                restartPlayer('El reproductor se cerro de forma inesperada o perdio conexion con el encoder, reiniciando reproductor multimedia',
                                streaming.wchannel.channel,streaming.wchannel.url)
                lostConnectionCount = 0
                statusMediaPlayer = false
            }
        }else{
            console.log(`${moment().format('MMMM Do YYYY, h:mm:ss a')} El reproductor esta en emision ${statusMediaPlayer}: valor anterior: ${previousvalue} || valor actual ${currentValue}`);
            previousvalue = currentValue
            statusMediaPlayer = true
        }
    },checktime)
}

module.exports = {
    playingPlayer
}