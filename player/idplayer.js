// const si = require('systeminformation')
const {status} = require('./system')
const clientMQTT = require('../broker/index')
const os = require('os')

function serialPlayer(){
    const networks = os.networkInterfaces()
    let { mac } = networks.eth0[0]
    let serial =  mac.replace(/:/g, '');
    // let {serial} = await si.osInfo()
    // return serial.slice(0,6)
    return serial 
}

async function doPublishStatusPlayer(){
    const statusPlayer = await status()
    const id = await serialPlayer()
    clientMQTT.publish(`player/status/${id}`, JSON.stringify(statusPlayer),{qos:2, retain:true},()=>{
      console.log(`mensaje publicado en topic player/status/${id}`);
    })
}

module.exports = {
    serialPlayer,
    doPublishStatusPlayer
}