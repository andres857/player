const { current }  = require('../streamings')
const {player} = require('./mediaplayer')
const {currentDate} =require('../date')

function playerIsRunning(time_pos){
    if (time_pos > current.monitor.previous_time_pos){
        // console.log(`[ MONITOR - Player running streaming - ${currentDate()} ]`);
        current.monitor.previous_time_pos = time_pos
        current.monitor.streaming_stop = 0
        current.broadcast = true
    }else if(time_pos <= current.monitor.previous_time_pos){
        console.log(`[ MONITOR - Player stop streaming - ${currentDate()}]`);
        current.monitor.streaming_stop = current.monitor.streaming_stop + 1
        current.broadcast = false
        if ((current.monitor.streaming_stop >= current.monitor.limits.streaming_stop) && current.monitor.openplayer){
            player.quit( e => {
                if(e){
                    console.error(`[ MONITOR - Error closing media player ${e.message} - ${currentDate()}] `);
                }else{
                    console.log(`[ MONITOR - Closing media player`);
                }
            })
        }
    }
}

function monitoringStreaming(){
    setInterval(() => {
        playerIsRunning(current.monitor.time_pos)
    }, 60000);
}

module.exports = {
    playerIsRunning,
    monitoringStreaming
}