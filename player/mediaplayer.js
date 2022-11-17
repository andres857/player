const PlayerController = require('media-player-controller');
const { institutional, current} = require('../streamings')
const {currentDate} = require('../date')
const { doPublishLaunchPlayer } = require('../broker/publication');


const player = new PlayerController({
    app: 'vlc',
    args: ['--video-on-top','--fullscreen', '--no-video-title-show'],//
    media: institutional.url
  });

//   ----- events of player media -----
// Data object with current playback event 
player.on('playback', (data)=>{
    current.monitor.time_pos = data.value
    // console.log(current.monitor);
});

// Playback started and player can now be controlled
player.on('playback-started',  async () => {
    console.log(`[ MEDIA PLAYER - EVENT - PLAYBACK - EL STREAMING A COMENZADO ]`);
    current.monitor.count_closed_mediaplayer = 0
    current.monitor.streaming_stop = 0
    current.broadcast = true
    current.monitor.previous_time_pos = current.monitor.time_pos
    console.log(`[ MEDIA PLAYER - Reproductor en emision de ${ current.name } - ${ current.url } - ${currentDate()} ]`)
    await doPublishLaunchPlayer(current)
});

player.on('app-exit', async (code) => {
    current.monitor.count_closed_mediaplayer = current.monitor.count_closed_mediaplayer + 1
    console.log(`[ MEDIA PLAYER - EVENT CLOSED - ${currentDate()} - exit code: ${code}]`);
    if( current.monitor.count_closed_mediaplayer >= current.monitor.limits.closed_mediaplayer){
        console.log(`[ MEDIA PLAYER - Player closed: Problem with streaming, closed too many times - ${currentDate()}]`);
        current.monitor.openplayer= false
        current.broadcast = false
        current.message = '[ MEDIA PLAYER - Player closed: Problem with streaming, closed too many times ]'
        await doPublishLaunchPlayer(current)
    }else{
        launchCurrentStream()
    }
});
//   ----- end events of player media -----

//Se definen los parametros del player, url, volumen etc
function launch(name, url, volume){
    const volumen = volume || 1
    player.launch( function(){
        console.log(`[ LAUNCH - parametros iniciales del streaming ]`);
        current.monitor.openplayer = true
        newStreaming(name,url,volumen)
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
        current.monitor.openplayer = false
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