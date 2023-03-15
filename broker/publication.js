import connectBroker from "./index.js"
import { buildTopics } from "../broker/topics.js"
import { Device } from "../player/index.js"

const device = new Device();

async function getParams(){
    const client = await connectBroker()
    const serial = await device.getSerial()
    let { publish } =  await buildTopics(serial)
    return {client, publish}
}

async function doPublish(msg){
    const { client, publish } = await getParams()
    await client.publish(publish.response, msg)
}

export {
    doPublish,
}