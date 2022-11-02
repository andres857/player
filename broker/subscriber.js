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
    console.log(`[ Broker - received from topic ${topic} : the message ${payload.toString()} ]`)
        if( topic === topics_subscriber.player ){
            if( message.restart === 'device' ){
                console.log('simulando reinicio del dispositivo');
            }else if (message.status === true){
                console.log('simulando envio de status del player');
            }else{
            console.log('message no valid');
            }
            
        }else if( topic === topics_subscriber.players ){
            if( message.restart === 'device' ){
                console.log('simulando reinicio del dispositivo Global');
            }else if (message.status === true){
                console.log('simulando envio de status del player Global');
            }
        }else{
            console.log('no valid');
        }   
    })
}

module.exports = {
    doSubscriber,
    receiverMessages
  }


