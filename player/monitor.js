const { current }  = require('../streamings')
const {player} = require('./mediaplayer')
const {currentDate} =require('../date')

function playerIsRunning(time_pos){
    if (time_pos > current.monitor.previous_time_pos){
        console.log(`[ MONITOR - Player running streaming - ${currentDate()} ]`);
        current.monitor.previous_time_pos = time_pos
        if (!current.broadcast){
            current.broadcast = true
        }
    }else{
        console.log(`[ MONITOR - Player stop streaming - ${currentDate()}]`);
        if (current.broadcast){
            current.broadcast = false
        }
        current.monitor.streaming_stop = current.monitor.streaming_stop + 1
        if (current.monitor.streaming_stop >= current.monitor.limits.streaming_stop){
            player.quit( e => {
                if(e){
                    console.error(`[ MONITOR - Error closing media player ${e.message} - ${currentDate()}] `);
                }else{
                    console.log(`[ MONITOR - closing media player`);
                }
            })
        }
    }
}

function monitoringStreaming(){
    setInterval(() => {
        console.log('monitoriando el streaming');
        playerIsRunning(current.monitor.time_pos)
    }, 600000);
}

module.exports = {
    playerIsRunning,
    monitoringStreaming
}