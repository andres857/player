const {clientMQTT} = require ('./index')
const {buildTopics} = require('./topics')
const player = require('../player/mediaplayer')

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

clientMQTT.on('message', async function (topic, payload) {
    let message = JSON.parse(payload)
    let {suscriber} = await buildTopics()
    console.log(`[ Broker - received from topic ${topic} : the message ${payload.toString()} ]`)
    console.log(message)

    if (topic == suscriber.request) {
        player.changeStreaming('pruebacambio','https://youtu.be/ifkYKxL3XBc',0.5)

    }else if (topic == suscriber.channel) {
        let titleStreaming = message.streaming
        let urlStreaming = message.urlStreaming
        player.changeStreaming(titleStreaming,urlStreaming)
        
    }else if (topic == suscriber.restart){
        console.log(`ll`);
    }
    //   clientMQTT.end()
})
// { 
//     "streaming" : "caracol" ,
//     "urlStreaming":"https://youtu.be/ifkYKxL3XBc",
//     "volume": 0.3
// }

// subscriber()

module.exports={
    subscriber
}



