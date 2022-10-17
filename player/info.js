const si = require('systeminformation')
const os = require('os')

async function status() {
    try {
      const { currentLoad } = await si.currentLoad()
      const { main } = await si.cpuTemperature()
      return {
        temperature: main.toString(),
        load: currentLoad.toFixed(2),
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
    // let { mac } = networks.eth0[0]
    let mac = '3c:a6:f6:36:bd:51'
    let serial =  mac.replace(/:/g, '');
    return serial.slice(-6)
}

module.exports = {
    status,
    interfaces,
    info,
    serial,
}