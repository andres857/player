const clientMQTT = require('./index')
const { buildTopics } = require('../broker/topics')
const { status } = require('../player/info')
const {currentDate} = require('../date')
const { current } = require('../streamings')


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
    const payload = {
        statusPlayer,
        current
    } 
    clientMQTT.publish( publish.status, JSON.stringify(payload), { 
        qos:2, 
        retain:true 
    }, ()=>{
        console.table(payload)
        console.log(`${currentDate()}`);
    })
  }

// the function that publish the status player is in file ~/player/player/idplayer.js
module.exports = {
    doPublishResponse,
    doPublishLaunchPlayer,
    doPublishStatusPlayer
}