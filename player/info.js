const si = require('systeminformation')
const os = require('os')

async function status() {
    try {
      let { currentLoad, avgLoad } = await si.currentLoad()
      let { main } = await si.cpuTemperature()
      return {
        temperature: main,
        load: currentLoad.toFixed(2),
        avg: avgLoad.toFixed(2)
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

module.exports = {
    status,
    interfaces,
    info,
    serial,
}