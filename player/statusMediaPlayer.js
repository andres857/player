require('dotenv').config({ path: '~/player/.env'})
const {getdatastremingplayer} = require('./mediaplayer')
const moment = require('moment')

let previousvalue = 0; 
const checktime = process.env.PLAYERCHECKTIME * 5000
let statusMediaPlayer = true;

function playingPlayer(){
// evaluate if the player media is playing .... 
    setInterval(()=>{
        let currentValue = getdatastremingplayer()
        if ( currentValue == previousvalue || currentValue == true){
            console.log(`${moment().format('MMMM Do YYYY, h:mm:ss a')} : El reproductor se detuvo ${statusMediaPlayer}: valor anterior: ${previousvalue} || valor actual ${currentValue}`);    
            statusMediaPlayer = false   
        }else{
            console.log(`${moment().format('MMMM Do YYYY, h:mm:ss a')} El reproductor esta en emision ${statusMediaPlayer}: valor anterior: ${previousvalue} || valor actual ${currentValue}`);
            statusMediaPlayer = true
            previousvalue = currentValue
        }
    },checktime)
}

module.exports = {
    playingPlayer
}