const si = require('systeminformation')
const os = require('os')
const {systemInfo} = require('../config')
const Wifi = require('rpi-wifi-connection');


class Device {
  constructor(){
    this.wifiNetworks = new Wifi()
  }

  system (){
    return systemInfo
  }
  
  async status() {
    try {
      let { currentLoad } = await si.currentLoad()
      let { main } = await si.cpuTemperature()
      let data = {
        temperature: main.toString(),
        load: currentLoad.toFixed(2),
      } 
      return data
    } catch (e) {
      console.log(`[ PLAYER System - Error obteniendo el status del player ]`);
    }
  }

  async interfaces(){
    return await os.networkInterfaces()
  }

  async info(){
    try {
      return await si.osInfo()
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

  async isConnectWifi(){
    const state = await this.wifiNetworks.getState()
    return state || false
  }

  async statusWifi(){
      let statewifi = await this.isConnectWifi()
      if (!statewifi) return false

      const network = await this.wifiNetworks.getStatus() 
      return network
  }

  async strenghtWifiSignal(nameNetwork=systemInfo.ssid){
    let statewifi = await this.isConnectWifi()
    if (!statewifi) return false
    const networksAvailable = await this.wifiNetworks.scan()
    const myNetwork = networksAvailable.find( netowrk => netowrk.ssid === nameNetwork)
    return myNetwork.signalLevel 
  }

  shutdown(callback){
    exec('sudo /sbin/shutdown -r now', function(error, stdout, stderr){
        console.log(`Reiniciando el dispositivo`);
        callback(stdout);
    });
  }
}

module.exports = Device