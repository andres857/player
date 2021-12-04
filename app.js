#!/usr/bin/node
const {launch} = require('./player/mediaplayer')
const {subscriber} = require('./broker/subscriber')
require('./player/verificationPlayer').playingPlayer()

async function main(){
    try {
    await subscriber()
    await launch()
    } catch (error) {
        console.log(`Error lanzando el reproductor ${error}`);
    } 
}
main()



