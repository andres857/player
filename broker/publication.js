const { buildTopics } = require('../broker/topics')
const { status } = require('../player/info')
const {currentDate} = require('../date')
const { current } = require('../streamings')
const {getSerial} = require('../player/info')



async function doPublish(client){
    try {
        await client.publish("wc/player", "It works!");
    } catch (e){
        console.log(e.stack);
        process.exit();
    }
}

async function doPublishResponse(client, topic, message){
    await client.publish(topic, message)
}

async function doPublishLaunchPlayer(client, currentStreaming){
    let { publish } =  buildTopics()
    await client.publish( publish.currentStreaming, JSON.stringify(currentStreaming), {
        qos:2, 
        retain:true
    },()=>{
        console.log(`[ Broker - publicando en ${publish.currentStreaming} el mensaje : ${currentStreaming} - ${currentDate()}]`);
    })
}

async function doPublishStatusPlayer(client){
    const serial = await getSerial()
    const { publish } = await buildTopics(serial)
    console.log(publish);
    const statusPlayer = await status()
    const payload = {
        statusPlayer,
        current
    } 
    await client.publish( publish.status, JSON.stringify(payload), { 
        qos:2, 
        retain:true 
    }, ()=>{
        console.table(payload)
        console.log(`${currentDate()}`);
    })
}

// the function that publish the status player is in file ~/player/player/idplayer.js
module.exports = {
    doPublish,
    doPublishResponse,
    doPublishLaunchPlayer,
    doPublishStatusPlayer
}