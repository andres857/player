#!/usr/bin/node
const { streaming } = require('./streaming')
const {launch} = require('./player/mediaplayer')
const {subscriber} = require('./broker/subscriber')

async function main(){
    try {
    await subscriber()
    await launch(streaming.wchannel.channel,streaming.wchannel.url)
    } catch (error) {
        console.log(`Error lanzando el reproductor ${error}`);
    } 
}
main()



