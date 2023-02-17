#!/usr/bin/node
const streamings = require('./streamings')
const { launch } = require('./player/mediaplayer')
const { buildTopics } = require('./broker/topics')
const { connectBroker } = require('./broker/')
const { doSubscriber, receiverMessages } = require('./broker/subscriber')
const Device = require('./player/info')

require('./player/monitor').monitoringStreaming()
require('./stats').loopStatus()

const player = new Device()

async function main(){
    try {
        const serial = await player.getSerial()
        await launch( streamings.institutional.name, streamings.institutional.url)
        
        const {suscriber} = await buildTopics(serial)
        const client = await connectBroker(serial)
         
        doSubscriber(client,suscriber).then((client)=>{
            receiverMessages(client, suscriber).then(()=>{
                console.log('[ PLAYER - ready for receiver messages from broker ]');
            })
        }).catch((e)=>{
            console.log(e);
        })
    } catch (error) {
        console.log(error);
    }
}
main()







