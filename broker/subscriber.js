const clientMQTT = require ('./index')
const {buildTopics} = require('./topics')
const {newStreaming,updateStreaming} = require('../player/mediaplayer')
const {streaming} = require('../streaming')
const shutdown = require('../player/restart')

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

    if (topic == suscriber.request && message.restart == 'device') {
        shutdown(function(output){
            console.log(output);
        });
    }else if (topic == suscriber.channel) {
        let titleStreaming = message.streaming
        let urlStreaming = message.urlStreaming
        let volume = message.volume

        newStreaming(titleStreaming,urlStreaming,volume,()=>{
            updateStreaming(streaming,titleStreaming,urlStreaming)
        })        
    }else if (topic == suscriber.restart && message.restart == 'device'){
            shutdown(function(output){
                console.log(output);
            });
    }
})

//{ "streaming" : "caracol" ,"urlStreaming":"http://192.168.0.8/comercial.m3u8","volume": 0.3}

subscriber()
module.exports={
    subscriber
}



