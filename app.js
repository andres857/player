#!/usr/bin/node
const streamings = require('./streamings')
const { launch } = require('./player/mediaplayer')
const { subscriber } = require('./broker/subscriber')
require('./stats').loopStatus()
const { streamingStarted,data_streaming } = require('./player/monitoringStreaming')

async function main(){
    try {
    await subscriber()
    console.log(streamings.institutional.name,streamings.institutional.url);
    await launch( streamings.institutional.name, streamings.institutional.url)
    setTimeout(()=>{
        const data = data_streaming.raw_player
        streamingStarted(data)
    },10000)
} catch (error) {
    console.log(error);
        console.log(`Error lanzando el reproductor ${error}`);
    } 
}

main()



