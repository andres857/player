require('dotenv').config({ path: '~/player/.env'})

const PlayerController = require('media-player-controller');
const { streaming, getCurrentStreaming } = require('../streaming')
const {doPublishSuccessChangeChannel} = require('../broker/publication');

var dataplayer;

const player = new PlayerController({
    app: 'vlc',
    args: ['--fullscreen','--video-on-top', '--no-video-title-show'],
    media: streaming.wchannel.url
  });

const playerOffLine = new PlayerController({
    app: 'vlc',
    args: ['--fullscreen','--video-on-top', '--no-video-title-show'],
    media: '/home/pi/Videos/HIDDEN_261_25528_VIDEO_Carlos_jovenes_en_la_organizacion.mp4'
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


// update the object streaming, object streaming, current channel, current urlChannel
function updateStreaming(streaming,channel,streamingUrl){
    streaming.currentChannel.url = streamingUrl
    streaming.currentChannel.channel = channel
    console.log(`[ MEDIA PLAYER - Update the Current Channel ]`);
    return streaming
}
// Change the streaming
function newStreaming(streamingName, streamingUrl,cb){
    player.load(streamingUrl,()=>{
        console.log(`[ MEDIA PLAYER - Canal ${streamingName} : Url Streaming ${streamingUrl} ]`);
        cb()
    })
}

function changeVolume(volume,cb){
    player.setVolume(volume)
    cb()
}

//Se definen los parametros del player, url, volumen etc
function launch(){
    player.launch(function(){
        // se define el canal inicial cuando el reproductor se inicia
        let channel = streaming.wchannel.channel
        let streamingUrl = streaming.wchannel.url 
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
    player,
    playerOffLine
}