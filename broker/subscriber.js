const { newStreaming } = require('../player/mediaplayer')
const shutdown = require('../player/restart')
const {doPublishStatusPlayer} = require('./publication')
const {currentDate} = require('../date')
const streamings = require('../streamings')
const mediaplayer = require('../player/info')

function evaluate(action){
    options = {
        restart: function(){
            // shutdown(function(output){
            //     console.log(` Reiniciando player topic global - ${currentDate()} `);
            //     console.log(output);
            // });
            console.log('Simulando reinicio del dispositivo');
        },
        status: async function(){
            const statusmp = await mediaplayer.status()
            console.log(statusmp);
        },
        streaming: function(){
            console.log('Simulando nuevo streaming');
        },
        interfaces: async function(){
            const networkmp = await mediaplayer.interfaces()
            console.log(networkmp)
        },
        info: async function(){
            const infomp = await mediaplayer.info()
            console.log(infomp);
        },
        node: async function(){
            const nodemp = await mediaplayer.nodeversion()
            console.log(nodemp);
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
        }else if( topic === topics_subscriber.players ){
            let k = Object.values(message) 
            evaluate(k[0])
        } 
    })
}


module.exports={
    doSubscriber,
    receiverMessages
}



