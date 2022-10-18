require('dotenv').config({ path: '~/player/.env'})
const PlayerController = require('media-player-controller');
const streamings = require('../streamings')
const {currentDate} = require('../date')
const { doPublishLaunchPlayer } = require('../broker/publication');

const player = new PlayerController({
    app: 'vlc',
    args: ['--fullscreen', '--no-video-title-show'],//'--video-on-top'
    // args: ['--video-on-top', '--no-video-title-show'],
    media: streamings.institutional.url
  });

//   ----- events of player media -----
// Data object with current playback event 
player.on('playback', (d)=>{
    if (process.env.APP_ENV === 'devel'){
        console.log(d.value,'value')
    }
    streamings.current.monitor.time_pos = d.value
});

function playerIsRunning(time_pos){
    if (time_pos >= streamings.current.previous_time_pos){
        console.log(`[ Player is running ]`);
        streamings.current.previous_time_pos = time_pos
        if (!streamings.current.inbroadcast){
            streamings.current.inbroadcast = true
        }
        console.log(`[ Running player: current Time: ${time_pos} - previous Value: ${streamings.current.previous_time_pos}]`);
    }else{
        console.log(`[ Player stop the streaming]`);
        if (streamings.current.inbroadcast){
            streamings.current.inbroadcast = false
        }
    }
}

// Playback started and player can now be controlled
player.on('playback-started',  async () => {
    streamings.current.inbroadcast = true 
    console.log(`[ MEDIA PLAYER - Reproductor en emision de ${ streamings.current.name } - ${ streamings.current.url } - ${currentDate()} ]`)
    //  colocar una bandera de reproduccion del reproductor multimedia
    await doPublishLaunchPlayer(streamings.current)
    });

player.on('app-exit', async (code) => {
    let { current } = streamings
    current.monitor.playerClosed + 1
    console.log(`[ MEDIA PLAYER - player closed - ${currentDate()} - exit code: ${code} ] `);
    if(current.monitor.playerClosed >= 10){
        console.log(`[ Player closed: Problem with streaming played closed too many twices - ${currentDate()}]`);
    }else{
        launchCurrentStream()
    }
});
//   ----- end events of player media -----

//Se definen los parametros del player, url, volumen etc
function launch(name, url){
    let { current } = streamings
    if( current.monitor.playerClosed >= 10){
        console.log(`[ Player closed: Problem with streaming played closed too many twices - ${currentDate()} ]`);
    }else{
        player.launch( function(){
            // se define el canal inicial cuando el reproductor se inicia
            newStreaming(name,url)
        });
    }
}

// testear funcion
function launchCurrentStream(){
    let { current, institutional } = streamings
    setTimeout(()=>{
        if ( current.url === '' || current.name === '' ){
            launch( institutional.name, institutional.url )
        }else{
            launch( current.name, current.url )
        }
    },10000)
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

// update the object streaming
function updateStreaming( name, url){
    streamings.current.name = name
    streamings.current.url = url
    console.log(`[ MEDIA PLAYER - Update the Current Channel - ${currentDate()} ]`);
}

// Change the streaming and update object streaming
function newStreaming(name, url){
    player.load( url, ()=>{
        console.log(streamings.current.inbroadcast);
        console.log(`[ MEDIA PLAYER NUEVO STREAMING - Canal: ${name} - Url Streaming: ${url} - ${currentDate()} ]`);
        updateStreaming(name, url)
    })
}

module.exports = {
    playerIsRunning,
    launch,
    changeVolume,
    newStreaming,
    updateStreaming,
    restartPlayer,
    player,
}