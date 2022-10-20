#!/usr/bin/node
const streamings = require('./streamings')
const { launch } = require('./player/mediaplayer')
const { subscriber } = require('./broker/subscriber')
require('./player/monitor').monitoringStreaming()
require('./stats').loopStatus()

async function main(){
    try {
    await subscriber()
    await launch( streamings.institutional.name, streamings.institutional.url)
} catch (error) {
    console.log(error);
        console.log(`Error lanzando el reproductor ${error}`);
    } 
}

main()



