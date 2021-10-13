const PlayerController = require('media-player-controller');
const { streaming, getCurrentStreaming } = require('../streaming')
// const {successChangeChannel} = require('../broker/publication')

var player = new PlayerController({
    app: 'vlc',
    args: ['--fullscreen','--video-on-top', '--no-video-title-show'],
    media: streaming.wchannel.url
  });

//   ----- events of player media -----
// Data object with current playback event 
player.on('playback', console.log);

// Playback started and player can now be controlled
player.on('playback-started',  async () => {
     let currentStreaming = getCurrentStreaming(streaming)
     let channel = currentStreaming.currentChannel.channel
     let urlStreaming = currentStreaming.currentChannel.url
     console.log(`[ MEDIA PLAYER - Reproductor en emision de ${channel} - ${urlStreaming}]`);
     console.log(`Simular publicacion en el broker`);
    });

player.on('app-exit', (code) => {
    console.log(`Media player closed. Exit code: ${code}`);
});
//   ----- events of player media -----
// update the object streaming
function updateStreaming(streaming,channel,streamingUrl){
    streaming.currentChannel.url = channel
    streaming.currentChannel.channel = streamingUrl
    return streaming
}
// Change the streaming
function newStreaming(streamingName, streamingUrl,volume,callback){
    player.load(streamingUrl,()=>{
        player.setVolume(volume,()=>{
            console.log(`Canal ${streamingName} : url Streaming ${streamingUrl} : Volumen streaming ${volume}`);
            callback()
        })
    })
}

function changeVolume(volume,cb){
    player.setVolume(volume)
    cb()
}

//Se definen los parametros del player, url, volumen etc
function launch(){
    player.launch(function(){
        //function get current channel or play channel institucional
        let channel = streaming.wchannel.channel
        let streamingUrl = streaming.wchannel.url 
        newStreaming(channel,streamingUrl,1,()=>{
            updateStreaming(streaming,channel,streamingUrl)
        })
    });
}

module.exports = {
    launch,
    changeVolume,
    newStreaming,
    updateStreaming
}