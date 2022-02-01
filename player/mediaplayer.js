require('dotenv').config({ path: '/home/pi/player/.env'})
const PlayerController = require('media-player-controller');
const { streaming, getCurrentStreaming } = require('../streaming')
const {doPublishSuccessChangeChannel} = require('../broker/publication');

var dataplayer;

const player = new PlayerController({
    app: 'vlc',
    args: ['--fullscreen','--video-on-top', '--no-video-title-show'],
    media: streaming.wchannel.url
  });

//   ----- events of player media -----
// Data object with current playback event 
player.on('playback', (d)=>{
    if (process.env.APP_ENV == 'devel'){
        dataplayer = d.value
        console.log(dataplayer,'value')
    }
});

function getdatastremingplayer(){
    return dataplayer
}

// Playback started and player can now be controlled
player.on('playback-started',  async () => {
     let currentStreaming = getCurrentStreaming(streaming)
     let channel = currentStreaming.currentChannel.channel
     let urlStreaming = currentStreaming.currentChannel.url
     console.log(`[ MEDIA PLAYER - Reproductor en emision de ${channel} - ${urlStreaming}]`)
     await doPublishSuccessChangeChannel(streaming.currentChannel)
    });

player.on('app-exit', (code) => {
    console.log(`Media player closed. Exit code: ${code}`);
});
//   ----- end events of player media -----

const restartPlayer = function(reason,nameChannel,url){
    player.quit(e => {
        if(e) return console.error(`[ Player - Error closing media player ${e.message} ] `);
        console.log(`[ Player - Closing Media Player Streaming from ${reason} ]`);
      })
    setTimeout(()=>{
    launch(nameChannel,url)
    },3000)
  }
// update the object streaming, object streaming, NEW current channel, NEW current urlChannel
function updateStreaming(streaming,channel,streamingUrl){
    streaming.currentChannel.channel = channel
    streaming.currentChannel.url = streamingUrl
    console.log(`[ MEDIA PLAYER - Update the Current Channel ]`);
    return streaming
  }
// Change the streaming
function newStreaming(streamingName, urlStreaming,cb){
    player.load(urlStreaming,()=>{
        console.log(`[ MEDIA PLAYER NUEVO STREAMING - Canal ${streamingName} : Url Streaming ${urlStreaming} ]`);
        cb()
    })
  }

function changeVolume(volume,cb){
    player.setVolume(volume)
    cb()
}
//Se definen los parametros del player, url, volumen etc
function launch(nameChannel,url){
    player.launch(function(){
        // se define el canal inicial cuando el reproductor se inicia
        let channel = nameChannel
        let streamingUrl = url
        newStreaming(channel,streamingUrl,()=>{
            updateStreaming(streaming,channel,streamingUrl)
        })
    });
}

module.exports = {
    launch,
    changeVolume,
    newStreaming,
    updateStreaming,
    getdatastremingplayer,
    restartPlayer,
    player,
}