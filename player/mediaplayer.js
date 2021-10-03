const PlayerController = require('media-player-controller');
const {streaming} = require('../streaming')
const {response,successChangeChannel} = require('../broker/publication')

var player = new PlayerController({
    app: 'vlc',
    args: ['--fullscreen','--video-on-top', '--no-video-title-show'],
    media: streaming.wchannel.url
  });

// Data object with current playback event 
player.on('playback', console.log);

// Playback started and player can now be controlled
player.on('playback-started', () => {
    console.log('Playback started. Player can now be controlled');
    successChangeChannel(`Cambio de canal exitoso`)
});

player.on('app-exit', (code) => {
    console.log(`Media player closed. Exit code: ${code}`);
});

function launch(){
    player.launch(err => {
        if(err) return console.error(`[ Player - Error launched Media Player ${err.message} ] `);;
        console.log('[ Player - Media player launched ]');
    });
}

async function changeStreaming(streamingName, streamingUrl){
    player.load(streamingUrl,()=>{
        console.log(`Cambiando Canal a ${streamingName}`);
    })
}

function changeVolume(volume){
    player.setVolume(volume)
}

module.exports = {
    player,
    launch,
    changeStreaming,
    changeVolume,
}