#!/usr/bin/node
const streamings = require('./streamings')
const { launch } = require('./player/mediaplayer')
const { buildTopics } = require('./broker/topics')
const { connectBroker } = require('./broker/')
const { doSubscriber, receiverMessages } = require('./broker/subscriber')
const {doPublish} = require('./broker/publication')
const { getSerial } = require('./player/info')
const { player } = require('./config')

require('./player/monitor').monitoringStreaming()
require('./stats').loopStatus()


async function main(){
    try {
        const serial = await getSerial()
        const {suscriber} = await buildTopics(serial)
        const client = await connectBroker(serial)

        doSubscriber(client,suscriber).then((client)=>{
            receiverMessages(client, suscriber).then(()=>{
                console.log('[ PLAYER - ready for receiver messages from broker ]');
            })
        }).catch((e)=>{
            console.log(e);
        })
        await launch( streamings.institutional.name, streamings.institutional.url)

    } catch (error) {
        console.log(error);
    }
}
main()







