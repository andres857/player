import PlayerController from "media-player-controller"
import streamings from "../streamings.js"
import { currentDate } from "../date.js"
import { doPublish } from "../broker/publication.js"
import Device from "../player/info.js"
import { channels } from "../config.js"


const device = new Device()
const player = new PlayerController({
    app: 'vlc',
    args: ['--fullscreen', '--no-video-title-show','--video-on-top'],//
    media: streamings.institutional.url,
    volume: 1
});

//   ----- events of player media -----
// Data object with current playback event 
player.on('playback', (data)=>{
    streamings.current.monitor.time_pos = data.value    
});

// Playback started and player can now be controlled
player.on('playback-started',  async () => {
    console.log(`[ MEDIA PLAYER - EVENT - PLAYBACK - EL STREAMING A COMENZADO ]`);
    streamings.current.monitor.count_closed_mediaplayer = 0
    streamings.current.broadcast = true
    streamings.current.monitor.openplayer= true
    streamings.current.monitor.previous_time_pos = streamings.current.monitor.time_pos
    console.log(`[ MEDIA PLAYER - Reproductor en emision de ${ streamings.current.name } - ${ streamings.current.url } - ${currentDate()} ]`)
    let payload = JSON.stringify(streamings.current)
    await doPublish(payload)    
});

player.on('app-exit', async (code) => {
    streamings.current.monitor.count_closed_mediaplayer = streamings.current.monitor.count_closed_mediaplayer + 1
    streamings.current.monitor.streaming_stop = 0
    console.log(`[ MEDIA PLAYER - EVENT CLOSED - ${currentDate()} - exit code: ${code}]`);
    if( streamings.current.monitor.count_closed_mediaplayer >= streamings.current.monitor.limits.closed_mediaplayer){
        console.log(`[ MEDIA PLAYER - Player closed: Problem with streaming, closed too many times, restart device - ${currentDate()}]`);
        streamings.current.monitor.openplayer= false
        streamings.current.broadcast = false
        streamings.current.message = '[ MEDIA PLAYER - Player closed: Problem with streaming, closed too many times, restart device ]'
        let payload = JSON.stringify(streamings.current)
        await doPublish(payload)
        device.reboot()
    }
    else{
        launchMediaPlayer()
    }
});
//   ----- end events of player media -----

//Se abre el reproductor multimedia por primera vez con los parametros iniciales
function launchMediaPlayer(){
    streamings.current.name = streamings.institutional.name
    streamings.current.url = streamings.institutional.url
    if ( !channels.closeStreaming_request ){
        player.launch( function(){
            streamings.current.monitor.openplayer = true
            console.log(`[ MEDIAPLAYER - LAUNCH - parametros iniciales del streaming ]`);
        });
    }
}

function changeVolume(volume, cb){
    player.setVolume(volume)
    cb()
}

// Change the streaming and update object streaming
function newStreaming(name, url, volume){
    player.load( url, ()=>{
        console.log(`[ MEDIA PLAYER - EVENT - LOAD - ${currentDate()} ]`);
        streamings.current.name = name
        streamings.current.url = url
        player.setVolume( volume,()=>{
            console.log(` level volumen = ${volume} `);
        })
    })
}

export {
    launchMediaPlayer,
    changeVolume,
    newStreaming,
    player,
}