import Wifi from "rpi-wifi-connection"
import psList from 'ps-list';
import { exec } from "child_process"
import si from "systeminformation"
import os from "os"
import fs from "fs"
import { systemInfo, channels } from "../config.js"

export default class Device {
  constructor(){
    this.wifiNetworks = new Wifi()
    this.pathScreenshot = `/home/${systemInfo.username}/player/screenshot.png`
    if (Device.instance){
      return Device.instance
    }
    Device.instance = this

  }

  system (){
    return systemInfo
  }

  async isRunning() {
    const processes = await psList();
    const vlcProcess = processes.find( process => process.name === 'vlc' );
    return !!vlcProcess;
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

  async screenshot() {
    if(fs.existsSync(this.pathScreenshot)) {
      fs.unlinkSync(this.pathScreenshot);
    }

    return new Promise((resolve, reject)=>{
      exec(`scrot -u -f ${this.pathScreenshot}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            reject (error);
        }
        console.log(stdout, stderr);
        console.log(`Screenshot taken and saved`);
        resolve('success')
      });
    })
  }

  async closeStreaming(){
    return new Promise((resolve,reject)=>{
      exec('killall vlc', (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            reject (error);
        }
        channels.closeStreaming_request = true
        resolve('success closing vlc')
      });
    })
  }

  async openStreaming(){
    channels.closeStreaming_request = false
  }
}


