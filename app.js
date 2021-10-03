const {player} = require('./player/mediaplayer')
const {clientMQTT} = require('./broker/index')
const {subscriber} = require('./broker/subscriber')
const {streaming} = require('./streaming')

// Emited on media player app launch 

async function main(){
    await player.launch()
    await subscriber()
}
main()



