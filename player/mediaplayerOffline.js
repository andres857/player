const {player} = require('./mediaplayer')


function launchPlayerOffline(){

    playerOffLine.on('app-exit', (code) => {
        console.log(`Media player closed. Exit code: ${code}`);
    });
    console.log(`intentos conectar al encoder: ${attemps} - Encoder de video no disponible`);
    playerOffLine.on('playback-started', () => {
        console.log('Playback started. Player can now be controlled');
      });
      playerOffLine.launch(err => {
    if(err) return console.error(err.message);
    console.log('Media player launched');
    });
}