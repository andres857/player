require('dotenv').config({ path: '~/player/.env'})
const {getdatastremingplayer} = require('./mediaplayer')
const {player,playerOffLine} = require('./mediaplayer')
const moment = require('moment')

var previousvalue = 0; 
const checktime = process.env.PLAYERCHECKTIME * 10000
var playerOffline = false;

function playingPlayer(){
// evaluate if the player media is playing .... 
    setInterval(()=>{
        let currentValue = getdatastremingplayer()
        if ( currentValue == previousvalue || currentValue == true){
            console.log(`${moment().format('MMMM Do YYYY, h:mm:ss a')} : El reproductor se detuvo : valor anterior: ${previousvalue} || valor actual ${currentValue}`);    
        }else{
            console.log(`${moment().format('MMMM Do YYYY, h:mm:ss a')} El reproductor esta en emision: valor anterior: ${previousvalue} || valor actual ${currentValue}`);
            previousvalue = currentValue
        }
    },checktime)
}

module.exports = {
    playingPlayer
}