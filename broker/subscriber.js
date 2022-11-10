const shutdown = require('../player/restart')
const {newStreaming} =require('../player/mediaplayer')
const {doPublishStatusPlayer,
    doPublishStreamingPlayer,
    doPublishInterfaces,
    doPublishInfoPlayer,
    doPublishNode} = require('./publication')
const {currentDate} = require('../date')


function evaluate(action){
    options = {
        restart: function(){
            shutdown(function(output){
                console.log(` Reiniciando player topic global - ${currentDate()} `);
                console.log(output);
            });
        },
        status: async function(){
            await doPublishStatusPlayer()
        },
        streaming: async function(){
            await doPublishStreamingPlayer()
        },
        interfaces: async function(){
            await doPublishInterfaces()
        },
        info: async function(){
            await doPublishInfoPlayer()
        },
        node: async function(){
            await doPublishNode()
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
            console.log(message.has);          
        }else if( topic === topics_subscriber.players ){
            if(message.hasOwnProperty('newstreaming')){
                console.log('nuevo streaming recibido');
                newStreaming(message.name,message.url)
            }else{
                let k = Object.values(message) 
                evaluate(k[0])
            }
        } 
    })
}


module.exports={
    doSubscriber,
    receiverMessages
}



