const {clientMQTT} = require('./index')
const {buildTopics} = require('../broker/topics')

function response(topic,message){
    clientMQTT.publish(topic, message)
}

async function successChangeChannel(channel){
    let topics = await buildTopics()
    clientMQTT.publish(topics.publish.response,channel)
    console.log(`publicando en ${topics.publish.response} el canal : ${channel}`);
}

module.exports = {
    response,
    successChangeChannel
}