const PlayerController = require('media-player-controller');
const {streaming} = require('./streaming')

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
});

player.on('app-exit', (code) => {
    console.log(`Media player closed. Exit code: ${code}`);
});

module.exports = {
    player,
}