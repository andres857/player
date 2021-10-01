const {player} = require('./player')
const {streaming} = require('./streaming')

console.log(streaming);
// Emited on media player app launch 
player.launch(err => {
    player.setVolume(0.2)
    if(err) return console.error(`[ Player - Error launched Media Player ${err.message} ] `);;
    console.log('[ Player - Media player launched ]');
});

setTimeout(() => {
    // player.quit()
    // console.log(`Cambiando volumen`);
    // player.setVolume(0.7)
    player.load(streaming.comercial.url,()=>{
        console.log(`Cambiando Canal a ${streaming.comercial.channel}`);
    })
}, 15000);


