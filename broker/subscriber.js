const clientMQTT = require ('./index')
const {buildTopics} = require('./topics')
const {newStreaming,updateStreaming,changeVolume} = require('../player/mediaplayer')
const {streaming} = require('../streaming')
const shutdown = require('../player/restart')
const {doPublishStatusPlayer} = require('../player/idplayer')

// susbcriber to all topics
async function subscriber(){
    const topics = await buildTopics()
    console.log(topics);
    for (let topic in topics.suscriber) {
        clientMQTT.subscribe(topics.suscriber[topic], function (err) {
            if (!err) {
                console.log(`[ BROKER - Client subscriber to topic ${topics.suscriber[topic]}]`);
            }else{
                console.log('[BROKER - Error en la suscripcion]');
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
    }else if (topic == suscriber.newStreaming) {
        let titleStreaming = message.titleStreaming
        let urlStreaming = message.urlStreaming
        let volume = message.volume

        newStreaming(titleStreaming,urlStreaming,()=>{
            updateStreaming(streaming,titleStreaming,urlStreaming)
        })        
    }else if (topic == suscriber.newStreamingPlayer) {

        let titleStreaming = message.titleStreaming
        let urlStreaming = message.urlStreaming

        newStreaming(titleStreaming,urlStreaming,()=>{
            console.log('ejectando cambio de streaming');
            updateStreaming(streaming,titleStreaming,urlStreaming)
        })        
    }else if(topic == suscriber.request){
        if (message.status == "device"){
            await doPublishStatusPlayer()
        }else if( message.volume){
            changeVolume(message.volume,()=>{
                console.log(`[ Broker - Cambiando volumen del player ]`);
            })
        }
    }
})

//{ "streaming" : "caracol" ,"urlStreaming":"http://192.168.0.8/comercial.m3u8","volume": 0.3}
module.exports={
    subscriber
}



