const { connectBroker } = require('./index')
const { buildTopics } = require('../broker/topics')
const {currentDate} = require('../date')
const { current } = require('../streamings')
const Device = require('../player/info')


const player = new Device()

async function getParams(){
    const client = await connectBroker()
    const serial = await player.getSerial()
    let { publish } =  await buildTopics(serial)
    return {client, publish}
}

async function doPublish(msg){
    const { client, publish } = await getParams()
    await client.publish(publish.response, msg)
}



module.exports = {
    doPublish,
}