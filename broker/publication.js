const clientMQTT = require('./index')
const { buildTopics } = require('../broker/topics')
const { status } = require('../player/info')
const currentDate = require('../date')


function doPublishResponse(topic,message){
    clientMQTT.publish(topic, message)
}

async function doPublishLaunchPlayer(currentStreaming){
    let { publish } =  buildTopics()
    clientMQTT.publish( publish.currentStreaming, JSON.stringify(currentStreaming), {
        qos:2, 
        retain:true
    },()=>{
        console.log(`[ Broker - publicando en ${publish.currentStreaming} el mensaje : ${currentStreaming} - ${currentDate()}]`);
    })
}

async function doPublishStatusPlayer(){
    const { publish } = buildTopics()
    const statusPlayer = await status()
    clientMQTT.publish( publish.status, JSON.stringify(statusPlayer), { 
        qos:2, 
        retain:true 
    }, ()=>{
      console.log(`[ Broker - publicando en ${publish.status} el mensaje : ${statusPlayer} - ${currentDate()}]`);
    })
  }

// the function that publish the status player is in file ~/player/player/idplayer.js
module.exports = {
    doPublishResponse,
    doPublishLaunchPlayer,
    doPublishStatusPlayer
}