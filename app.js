#!/usr/bin/node
import { launchMediaPlayer } from "./player/mediaplayer.js"
import { buildTopics } from "./broker/topics.js"
import connectBroker from "./broker/index.js"
import { doSubscriber, receiverMessages } from "./broker/subscriber.js"
import { monitoringStreaming } from "./player/monitor.js"
import { loopStatus } from "./stats.js"
import Device from "./player/info.js"

const player = new Device()

async function main(){
    try {
        const serial = await player.getSerial()
        launchMediaPlayer()
        const {suscriber} = await buildTopics(serial)
        const client = await connectBroker(serial)
         
        doSubscriber(client,suscriber).then((client)=>{
            receiverMessages(client, suscriber).then(()=>{
                console.log('[ PLAYER - ready for receiver messages from broker ]');
            })
        }).catch((e)=>{
            console.log(e);
        })
        await monitoringStreaming()
        await loopStatus()
    } catch (error) {
        console.log(error);
    }
}
main()