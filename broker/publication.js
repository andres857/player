const {clientMQTT} = require('./index')
const {buildTopics} = require('../broker/topics')

function response(topic,message){
    clientMQTT.publish(topic, message)
}

async function successChangeChannel(channel){
    let topics = await buildTopics()
    console.log(topics.publish.response);
    clientMQTT.publish(topics.publish.response,channel)
}

module.exports = {
    response,
    successChangeChannel
}