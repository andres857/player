const si = require('systeminformation')
const os = require('os')

class Device {
  async status() {
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

  async interfaces(){
    const networks = os.networkInterfaces()
    return networks
  }

  async info(){
    try {
      let info = await si.osInfo()
      let [ user ] = await si.users()
      const infoPlayer = {
        info,
        user
      }
      return infoPlayer
    } catch (error) {
      console.log(`[ INFO PLAYER - error obteniendo la info del player - ${error}]`);
    }
  }

  async nodeversion(){
    return process.version;
  }

  async getSerial(){
    const {serial} = await si.system()
    return serial.substring(serial.length -8)
  }
}

module.exports = Device