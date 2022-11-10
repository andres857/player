const { connectBroker } = require('./index')
const { buildTopics } = require('../broker/topics')
const { status,interfaces,info,nodeversion } = require('../player/info')
const {currentDate} = require('../date')
const { current } = require('../streamings')
const {getSerial} = require('../player/info')

async function getParams(){
    const client = await connectBroker()
    const serial = await getSerial()
    let { publish } =  await buildTopics(serial)
    return {client, publish}
}

async function doPublishResponse( message ){
    const {client, publish} = await getParams()
    await client.publish(publish.response, message)
}

async function doPublishLaunchPlayer(currentStreaming){
    const {client, publish} = await getParams()
    await client.publish( publish.currentStreaming, JSON.stringify(currentStreaming), {
        qos:2, 
        retain:false
    })
    console.log(`[ Broker - publicando en ${publish.currentStreaming} el mensaje : ${currentStreaming} - ${currentDate()}]`);
}

async function doPublishStatusPlayer(){
    const {client, publish} = await getParams()
    const statusPlayer = await status()

    await client.publish( publish.status, JSON.stringify(statusPlayer), { 
        qos:2, 
        retain:true 
    })
    console.log(`[ Broker - publicando en ${publish.status} el mensaje : ${statusPlayer} - ${currentDate()}]`);
}

async function doPublishStreamingPlayer(){
    const {client, publish} = await getParams()
    await client.publish( publish.status, JSON.stringify(current), { 
        qos:2, 
        retain:true 
    })
    console.log(`[ Broker - publicando en ${publish.status} el mensaje : ${current} - ${currentDate()}]`);
}

async function doPublishInterfaces(){
    const {client, publish} = await getParams()
    const interfacesPlayer = await interfaces()
    await client.publish( publish.status, JSON.stringify(interfacesPlayer), { 
        qos:2, 
        retain:true 
    })
    console.log(`[ Broker - publicando en ${publish.status} el mensaje : ${current} - ${currentDate()}]`);
}

async function doPublishInfoPlayer(){
    const {client, publish} = await getParams()
    const infoPlayer = await info()
    await client.publish( publish.status, JSON.stringify(infoPlayer), { 
        qos:2, 
        retain:true 
    })
    console.log(`[ Broker - publicando en ${publish.status} el mensaje : ${infoPlayer} - ${currentDate()}]`);
}

async function doPublishNode(){
    const {client, publish} = await getParams()
    const nodePlayer = await nodeversion()
    await client.publish( publish.status, JSON.stringify(nodePlayer), { 
        qos:2, 
        retain:true 
    })
    console.log(`[ Broker - publicando en ${publish.status} el mensaje : ${nodePlayer} - ${currentDate()}]`);
}


module.exports = {
    doPublishResponse,
    doPublishLaunchPlayer,
    doPublishStatusPlayer,
    doPublishStreamingPlayer,
    doPublishInterfaces,
    doPublishInfoPlayer,
    doPublishNode
}