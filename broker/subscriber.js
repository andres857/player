const {clientMQTT} = require ('./index')
const {buildTopics} = require('./topics')
const {newStreaming,updateStreaming} = require('../player/mediaplayer')
const {streaming} = require('../streaming')

// susbcriber to all topics
async function subscriber(){
    const topics = await buildTopics()
    for (let topic in topics.suscriber) {
        clientMQTT.subscribe(topics.suscriber[topic], function (err) {
            if (!err) {
                console.log(`[ BROKER - Client subscriber to topic ${topics.suscriber[topic]}]`);
            }
        })
    }
}

// event listen messages from broker
clientMQTT.on('message', async function (topic, payload) {
    let message = JSON.parse(payload)
    let {suscriber} = await buildTopics()
    console.log(`[ Broker - received from topic ${topic} : the message ${payload.toString()} ]`)
    console.log(message)

    if (topic == suscriber.request) {
        let titleStreaming = message.streaming
        let urlStreaming = message.urlStreaming
        player.changeStreaming(titleStreaming,urlStreaming)
        
    }else if (topic == suscriber.channel) {
        let titleStreaming = message.streaming
        let urlStreaming = message.urlStreaming
        // let volume = message.volume
        newStreaming(titleStreaming,urlStreaming,1,()=>{
            updateStreaming(streaming,titleStreaming,urlStreaming)
        })        
    }else if (topic == suscriber.restart){
        console.log(`ll`);
    }
})

//{ "streaming" : "caracol" ,"urlStreaming":"http://192.168.0.8/comercial.m3u8","volume": 0.3}
// subscriber()

module.exports={
    subscriber
}



