const clientMQTT = require('./index')
const {buildTopics} = require('../broker/topics')

function response(topic,message){
    clientMQTT.publish(topic, message)
}

async function successChangeChannel(channel){
    let topics = await buildTopics()
    clientMQTT.publish(topics.publish.response,channel)
    console.log(`publicando en ${topics.publish.response} el canal : ${channel}`);
}

function doPublishStatusPlayer(topic,status) {
      try {
        clientMQTT.publish(topic, JSON.stringify(status),{qos:2, retain:true},()=>{
            console.log(`[ BROKER Publications - publicando estados en ${topic}]`);
        });
        
      } catch (e){
          console.log(e.stack);
          process.exit();
      }
  }

module.exports = {
    response,
    successChangeChannel,
    doPublishStatusPlayer
}