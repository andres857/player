const { exec } = require('child_process');
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

  async connectionTypeUse(){
    try {
      const networkInterfaces = os.networkInterfaces();
      let connectionType;

      Object.keys(networkInterfaces).forEach((interfaceName) => {
        if (interfaceName === 'eth0' || interfaceName === 'wlan0') {
          networkInterfaces[interfaceName].forEach((interfaceData) => {
            if (interfaceData.family === 'IPv4' && !interfaceData.internal && interfaceData.address) {
              connectionType = interfaceName;
            }
          });
        }
      });
      return connectionType;
    } catch (error) {
      console.log('PLAYER - ERROR OBTENIENDO INFORMACION DE LA RED', error);
      return 'Network interface not found'
    }
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

  reboot(){
    exec('sudo /sbin/shutdown -r now', function(error, stdout, stderr){
      if (error) {
        console.error(`exec error: ${error}`);
        return error;
      }  
      if (stderr) {
        console.error(`stderr: ${stderr}`);
        return stderr;
      }
      console.log(`stdout: ${stdout}`);
    });
  }
}


module.exports = Device