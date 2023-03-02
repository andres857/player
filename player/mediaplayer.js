const PlayerController = require('media-player-controller');
const { institutional, current} = require('../streamings')
const {currentDate} = require('../date')
const { doPublish } = require('../broker/publication');
const mediaPlayer = require('../player/info') 


const device = new mediaPlayer()
const player = new PlayerController({
    app: 'vlc',
    args: ['--fullscreen', '--no-video-title-show','--video-on-top'],//
    media: institutional.url,
    volume: 1
  });

//   ----- events of player media -----
// Data object with current playback event 
player.on('playback', (data)=>{
    current.monitor.time_pos = data.value    
});

// Playback started and player can now be controlled
player.on('playback-started',  async () => {
    console.log(`[ MEDIA PLAYER - EVENT - PLAYBACK - EL STREAMING A COMENZADO ]`);
    current.monitor.count_closed_mediaplayer = 0
    current.broadcast = true
    current.monitor.openplayer= true
    current.monitor.previous_time_pos = current.monitor.time_pos
    console.log(`[ MEDIA PLAYER - Reproductor en emision de ${ current.name } - ${ current.url } - ${currentDate()} ]`)
    let payload = JSON.stringify(current)
    await doPublish(payload)    
});

player.on('app-exit', async (code) => {
    current.monitor.count_closed_mediaplayer = current.monitor.count_closed_mediaplayer + 1
    current.monitor.streaming_stop = 0
    console.log(`[ MEDIA PLAYER - EVENT CLOSED - ${currentDate()} - exit code: ${code}]`);
    if( current.monitor.count_closed_mediaplayer >= current.monitor.limits.closed_mediaplayer){
        console.log(`[ MEDIA PLAYER - Player closed: Problem with streaming, closed too many times, restart device - ${currentDate()}]`);
        current.monitor.openplayer= false
        current.broadcast = false
        current.message = '[ MEDIA PLAYER - Player closed: Problem with streaming, closed too many times, restart device ]'
        let payload = JSON.stringify(current)
        await doPublish(payload)
        device.reboot()
    }else{
        launchCurrentStream()
    }
});
//   ----- end events of player media -----

//Se abre el reproductor multimedia por primera vez con los parametros iniciales
function launch(name, url){
    player.launch( function(){
        current.monitor.openplayer= true
        current.name = name
        current.url = url
        console.log(`[ LAUNCH - parametros iniciales del streaming ]`);
    });
}

function launchCurrentStream(){
    let { current, institutional } = streamings
    setTimeout(()=>{
        if ( current.url === '' || current.name === '' ){
            launch( institutional.name, institutional.url )
        }else{
            launch( current.name, current.url )
        }
    },3000)
}

function restartPlayer( reason ){
    player.quit( e => {
        if(e) return console.error(`[ Player - Error closing media player ${e.message} - ${currentDate()}] `);
        console.log(`[ Player - closing media player from ${reason} - ${currentDate()} ]`);
      })
    setTimeout(()=>{
        launchCurrentStream()
    },3000)
  }

function changeVolume(volume, cb){
    player.setVolume(volume)
    cb()
}

// Change the streaming and update object streaming
function newStreaming(name, url, volume){
    player.load( url, ()=>{
        console.log(`[ MEDIA PLAYER - EVENT - LOAD - ${currentDate()} ]`);
        current.name = name
        current.url = url
        player.setVolume(volume,()=>{
            console.log(` level volumen = ${volume} `);
        })
    })
}

module.exports = {
    launch,
    changeVolume,
    newStreaming,
    restartPlayer,
    player,
}