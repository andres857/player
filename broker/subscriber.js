const { newStreaming } = require('../player/mediaplayer')
const shutdown = require('../player/restart')
const {doPublishStatusPlayer} = require('./publication')
const {currentDate} = require('../date')
const streamings = require('../streamings')

function evaluate(action){
    options = {
        restart: function(){
            // shutdown(function(output){
            //     console.log(` Reiniciando player topic global - ${currentDate()} `);
            //     console.log(output);
            // });
            console.log('Simulando reinicio del dispositivo');
        },
        status: function(){
            console.log('Simulando publiacion en el broker');
            // await doPublishStatusPlayer(client)
        },
        streaming: function(){
            console.log('Simulando cambio de streaming');
        },
        nothing: function(){
            console.log('Nada para hacer');
        }
    }
    const execute = options[action] ??  options['nothing'];
    execute()
}


async function doSubscriber(client,topics){
    try {
        for (let topic in topics) {
            await client.subscribe(topics[topic])
            console.log(`[ BROKER - Client subscriber to topic ${topics[topic]} ]`);
        }
        return client
    } catch (error) {
        console.log(`[ Error - error subscriber to topics ]`);
    }
}

async function receiverMessages(client,topics_subscriber){
    client.on('message', async function ( topic, payload ) {
    let message = JSON.parse( payload )
    console.log(`[ Broker - received from topic ${topic} : the message ${message} ]`)
    if( topic === topics_subscriber.player ){
            console.log('hola mundo');
            console.log(message);
            // evaluate(message)
          
        }else if( topic === topics_subscriber.players ){
            let k = Object.keys(message) 
            evaluate(k[0])
        } 
    })
}

module.exports={
    doSubscriber,
    receiverMessages
}



