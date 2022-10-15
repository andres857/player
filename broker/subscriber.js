const clientMQTT = require ('./index')
const { buildTopics } = require('./topics')
const { newStreaming } = require('../player/mediaplayer')
const shutdown = require('../player/restart')
const {doPublishStatusPlayer} = require('./publication')
const currentDate = require('../date')

// susbcriber to all topics
function subscriber(){
    return new Promise((resolve) => {
        const { suscriber } = buildTopics()
        console.log( suscriber );
        resolve(
            setTimeout(()=>{
                for (let topic in suscriber) {
                    clientMQTT.subscribe(suscriber[topic], function (err) {
                        if (!err) {
                            console.log(`[ BROKER - Client subscriber to topic ${suscriber[topic]}- ${currentDate()}]`);
                        }else{
                            console.log(`[ BROKER - Error en la suscripcion - ${currentDate()}]`);
                            console.log(err);
                        }
                    })
                }
            },5000)
        )
    })
}

// event listen messages from broker
clientMQTT.on('message', async function ( topic, payload ) {
    let message = JSON.parse( payload )
    console.log(message);
    let { suscriber } = buildTopics()
    console.log(suscriber);
    console.log(`[ Broker - received from topic ${topic} : the message ${payload.toString()} - ${currentDate()} ]`)

    if ( topic === suscriber.players) {
        if( message.restart === 'device' ){
        shutdown(function(output){
                    console.log(` Reiniciando player topic global - ${currentDate()} `);
                    console.log(output);
                });
        }else if(message.streaming.name !== "" && message.streaming.url !== ""){
            newStreaming( message.streaming.name, message.streaming.url )
        }else{
            console.log('peticiones no valida')
        }
    }else if ( topic === suscriber.player ) {
        if (message.status === 'device'){
            await doPublishStatusPlayer()
        }
        // let { actions } = message
        // console.log(actions);
        // if(actions.restart){
        //     shutdown(function(output){
        //         console.log(` Reiniciando player - ${currentDate()} `);
        //         console.log(output);
        //     });
        // }else if(actions.status){
        //     await doPublishStatusPlayer()
        // }else if(actions.newstreaming.name != '' && actions.newstreaming.url != ''){
        //     newStreaming( actions.newstreaming.name, actions.newstreaming.url )
        // }
    }
})

// { 
//     "streaming" : "caracol" ,
//     "urlStreaming":"http://192.168.0.8/comercial.m3u8",
//     "volume": 0.3
// }
module.exports={
    subscriber
}



