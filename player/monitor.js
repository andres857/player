import streamings from "../streamings.js"
import { player, launchMediaPlayer } from "./mediaplayer.js"
import {currentDate} from "../date.js"
import {debug} from "../config.js"
import { channels } from "../config.js"
import Device from "./info.js"

const mediaplayer = new Device();

async function playerIsRunning(time_pos){
    if (time_pos > streamings.current.monitor.previous_time_pos){
        if (debug === 'true'){
            console.log('-----------------------------------------------------------');
            console.log(`previous_time_pos ${streamings.current.monitor.previous_time_pos} --- time_pos: ${time_pos}`);
            console.log(`[ MONITOR [DEBUG] - Player running streaming - ${currentDate()} ]`);
            console.log('-----------------------------------------------------------');
        }
        console.log(`[ MONITOR - Player running streaming - ${currentDate()} ]`);
        streamings.current.monitor.previous_time_pos = time_pos
        streamings.current.monitor.streaming_stop = 0
        streamings.current.broadcast = true
    }else if(time_pos <= streamings.current.monitor.previous_time_pos){
        if (debug === 'true') {
            console.log('-----------------------------------------------------------');
            console.log(`previous_time_pos ${streamings.current.monitor.previous_time_pos} --- time_pos: ${time_pos}`);
            console.log(`[ MONITOR [DEBUG] - Player stop streaming - ${currentDate()}]`);
            console.log('-----------------------------------------------------------');
        }
        console.log(`[ MONITOR - Player stop streaming - ${currentDate()}]`);
        streamings.current.monitor.streaming_stop = streamings.current.monitor.streaming_stop + 1
        streamings.current.broadcast = false
        const vlcisRunning = await mediaplayer.isRunning()
        if ( !vlcisRunning ){
            console.log(`[ MONITOR - VLC is closed ]`);
            launchMediaPlayer()
        }else{
            if (streamings.current.monitor.streaming_stop >= streamings.current.monitor.limits.streaming_stop){
                player.quit( e => {
                    if(e){
                        console.error(`[ MONITOR - Error closing media player ${e.message} - ${currentDate()}] `);
                    }else{
                        console.log(`[ MONITOR - Closing media player ]`);
                    }
                })
            }
        }
    }
}
// every two minutes check if stream still active 120000
function monitoringStreaming(){
    setInterval(() => {
        if (!channels.closeStreaming_request){
            playerIsRunning(streamings.current.monitor.time_pos)
        }else{
            console.log(`[ MONITOR - Closing media player from request web ]`);
        }
    }, 10000);
}

export {
    playerIsRunning,
    monitoringStreaming
}