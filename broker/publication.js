const clientMQTT = require('./index')
const {buildTopics} = require('../broker/topics')

function doPublishResponse(topic,message){
    clientMQTT.publish(topic, message)
}

async function doPublishSuccessChangeChannel(channel){
    let topics = await buildTopics()
    clientMQTT.publish(topics.publish.currentStreaming,JSON.stringify(channel),{qos:2, retain:true})
    console.log(`[ Broker - publicando en ${topics.publish.currentStreaming} el mensaje : ${channel} ]`,channel);
}

// the function that publish the status player is in file ~/player/player/idplayer.js
module.exports = {
    doPublishResponse,
    doPublishSuccessChangeChannel,
}