require('dotenv').config({ path: '/home/pi/player/.env'})
const PlayerController = require('media-player-controller');
const streamings = require('../streamings')
const currentDate = require('../date')
// const { doPublishSuccessChangeChannel } = require('../broker/publication');


const player = new PlayerController({
    app: 'vlc',
    args: ['--fullscreen','--video-on-top', '--no-video-title-show'],
    // args: ['--video-on-top', '--no-video-title-show'],
    media: streamings.institutional.url
  });

//   ----- events of player media -----
// Data object with current playback event 
player.on('playback', (d)=>{
    if (process.env.APP_ENV == 'devel'){
        console.log(d.value,'value')
    }
});

// Playback started and player can now be controlled
player.on('playback-started',  async () => {
     let { current } = streamings
     console.log(`[ MEDIA PLAYER - Reproductor en emision de ${ current.name } - ${ current.url } - ${currentDate()}]`)
     //  publish every time player started
    //  await doPublishSuccessChangeChannel(current)
    });

player.on('app-exit', async (code) => {
    console.log(`[ MEDIA PLAYER - player closed - ${currentDate()} - exit code: ${code} ] `);
    launchCurrentStream()
});
//   ----- end events of player media -----

//Se definen los parametros del player, url, volumen etc
function launch(name, url){
    player.launch( function(){
        // se define el canal inicial cuando el reproductor se inicia
        newStreaming(name,url)
    });
}

function launchCurrentStream(){
    let { current, institutional } = streamings
    if ( current.url === '' || current.name === '' ){
        launch( institutional.name, institutional.url )
    }else{
        launch( current.name, current.url )
    }
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
        console.log(`[ MEDIA PLAYER NUEVO STREAMING - Canal: ${name} - Url Streaming: ${url} - ${currentDate()} ]`);
        updateStreaming(name, url)
    })
}

module.exports = {
    launch,
    changeVolume,
    newStreaming,
    updateStreaming,
    restartPlayer,
    player,
}