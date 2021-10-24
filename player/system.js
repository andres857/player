const si = require('systeminformation');

async function status() {
    try {
      let {currentLoad} = await si.currentLoad()
      currentLoad = currentLoad.toFixed(0)
      let {main} = await si.cpuTemperature()
      console.log(main,currentLoad);
      return {
        currentLoad,
        main
      }
    } catch (e) {
      console.log(`[ PLAYER System - Error obteniendo el status del player ]`);
    }
}

async function Interfaces(){
    let interfaces = await si.networkInterfaces()
    let ip4 = interfaces[1].ip4
    let MAC = interfaces[1].mac
    console.log(ip4);
    return {
        ip4,MAC
    }
}

module.exports ={
    status,
    Interfaces,
}
