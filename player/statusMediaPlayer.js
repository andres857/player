require('dotenv').config({ path: '~/player/.env'})
const {getdatastremingplayer,restartPlayer} = require('./mediaplayer')
const {streaming} = require('../streaming')
const moment = require('moment')

let previousvalue = 0; 
const checktime = process.env.PLAYERCHECKTIME * 10000
let attempsConnectEncoder = 0;
let statusMediaPlayer = true;

function playingPlayer(){
// evaluate if the player media is playing .... 
    setInterval(()=>{
        let currentValue = getdatastremingplayer()
        if ( currentValue == previousvalue || currentValue == true){
            statusMediaPlayer = false    
            attempsConnectEncoder = attempsConnectEncoder + 1
            console.log(`${moment().format('MMMM Do YYYY, h:mm:ss a')} : El reproductor se detuvo ${statusMediaPlayer}: valor anterior: ${previousvalue} || valor actual ${currentValue}`);    
            restartPlayer('El player se cerro inesperadamente, reiniciando reproductor multimedia',
            streaming.local.channel,streaming.local.url)
            if (attempsConnectEncoder >= 5){
                console.log(`imposible conectar con el encoder, abriendo reporduccion local de videos`);
            }
        }else{
            statusMediaPlayer = true
            console.log(`${moment().format('MMMM Do YYYY, h:mm:ss a')} El reproductor esta en emision ${statusMediaPlayer}: valor anterior: ${previousvalue} || valor actual ${currentValue}`);
            previousvalue = currentValue
        }
    },checktime)
}



module.exports = {
    playingPlayer
}