#!/usr/bin/node
const streamings = require('./streamings')
const { launch } = require('./player/mediaplayer')
const {serial} = require('./player/info')
const { subscriber } = require('./broker/subscriber')
const { player } = require('./config')
require('./player/monitor').monitoringStreaming()
require('./stats').loopStatus()

async function main(){
    try {
        serial().then( async (serial)=>{
            player.serial = serial
            await subscriber()
        }).catch(e => console.log(e))
        
        await launch( streamings.institutional.name, streamings.institutional.url)
        } catch (error) {
            console.log(error);
                console.log(`Error lanzando el reproductor ${error}`);
        } 
}

main()



