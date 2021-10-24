const clientMQTT = require('./index')
const {buildTopics} = require('../broker/topics')

function doPublishResponse(topic,message){
    clientMQTT.publish(topic, message)
}

async function doPublishSuccessChangeChannel(channel){
    let topics = await buildTopics()
    clientMQTT.publish(topics.publish.response,channel)
    console.log(`[ Broker - publicando en ${topics.publish.response} el canal : ${channel} ]`);
}

module.exports = {
    doPublishResponse,
    doPublishSuccessChangeChannel,
}