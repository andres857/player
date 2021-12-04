const {getdatastremingplayer} = require('./mediaplayer')
const {player,playerOffLine} = require('./mediaplayer')

var previousvalue = 0; 
var attemps = 0;
var playerOffline = false;

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

function playingPlayer(){
// evaluate if the player media is playing .... 
    setInterval(()=>{
        let currentValue = getdatastremingplayer()
        if ( currentValue > previousvalue){
            console.log(`el reproductor esta en emision: valor anterior: ${previousvalue} || valor actual ${currentValue}`);
            previousvalue = currentValue
        }if (currentValue == previousvalue) {
            //function try reconnect to encoder five times, every 60 seconds
            attemps = attemps + 1
            console.log(`soy un mensaje de prueba 1`);
            if (attemps >= 25 && !playerOffline){
                
                console.log(`El reproductor se detuvo ERROR posible interferencia en la red`);
                console.log(`el reproductor se detuvo : valor anterior: ${previousvalue} || valor actual ${currentValue}`);   
                playerOffline = true
            }
            
        }
    },5000)
}

module.exports = {
    playingPlayer
}