const {run} = require('./index')
const {buildTopics} = require('./topics')

let client = null

async function doSubscriber(){
    try {
        client = await run()
        const {suscriber} = await buildTopics()
        for (let topic in suscriber) {
            await client.subscribe(suscriber[topic])
            console.log(`[ BROKER - Client subscriber to topic ${suscriber[topic]} ]`);
        }
    return client
    } catch (error) {
        console.log(`[ Error - error subscriber to topics ]`);
    }
    
}

 function receiverMessages(client){
    console.log('function receiver messages s');
    client.on('message', async function ( topic, payload ) {
      let message = JSON.parse( payload )
      console.log(message);
      let { suscriber } = await buildTopics()
      console.log(suscriber);
      console.log(`[ Broker - received from topic ${topic} : the message ${payload.toString()} ]`)
  
      if ( topic === suscriber.players) {
          if( message.restart === 'device' ){
          console.log('simulando reinicio del dispositivo');
          }else if(message.streaming.name !== "" && message.streaming.url !== ""){
              console.log('nuevo streaming recibido');
          }else{
              console.log('peticiones no valida')
          }
      }else if ( topic === suscriber.player ) {
          if (message.status === 'device'){
              console.log('simulando el envio del estatus del player');
          }
      }})
}


module.exports = {
    doSubscriber,
    receiverMessages
  }

