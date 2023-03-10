import handleService from "../services/index.js"
import { doPublish } from "../broker/publication.js"

const service = new handleService()

async function doSubscriber( client,topics ){
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
    console.log(`[ Broker - received from topic ${topic} : the message]`, message)
    if( topic === topics_subscriber.player ){
        let data = await service.handle(message.mediaplayer)
        let payload = JSON.stringify(data);
        await doPublish(payload)
    }else if( topic === topics_subscriber.players ){
        let data = await service.handle(message.mediaplayer)
        let payload = JSON.stringify(data);
        await doPublish(payload)
        } 
    })
}

export {
    doSubscriber,
    receiverMessages
}



