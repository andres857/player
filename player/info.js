const clientMQTT = require('../broker/index')
const si = require('systeminformation')
const os = require('os')

async function status() {
    try {
      let { currentLoad, avgLoad } = await si.currentLoad()
      currentLoad = currentLoad.toFixed(2)
      avgLoad = avgLoad.toFixed(2)
      let { main } = await si.cpuTemperature()
      console.log( main, currentLoad, avgLoad )
      return {
        main,
        currentLoad,
        avgLoad
      }
    } catch (e) {
      console.log(`[ PLAYER System - Error obteniendo el status del player ]`);
    }
}

async function interfaces(){
  const networks = os.networkInterfaces()
  return networks
}
async function info(){
  let info = await si.osInfo()
  return info
}

function serial(){
    const networks = os.networkInterfaces()
    let { mac } = networks.eth0[0]
    let serial =  mac.replace(/:/g, '');
    return serial.slice(-6)
}

async function doPublishStatusPlayer(){
    const statusPlayer = await status()
    const id = await serialPlayer()
    clientMQTT.publish(`player/status/${id}`, JSON.stringify(statusPlayer),{qos:2, retain:true},()=>{
      console.log(`mensaje publicado en topic player/status/${id}`);
    })
}

module.exports = {
    status,
    interfaces,
    info,
    serial,
    doPublishStatusPlayer
}