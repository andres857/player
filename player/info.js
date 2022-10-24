const si = require('systeminformation')
const os = require('os')
const { exec } = require('child_process');


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
  console.log(networks);
  return networks
}

async function info(){
  try {
    let info = await si.osInfo()
    let { node, npm } = await si.versions()
    let [ user ] = await si.users()
    const infoPlayer = {
      info,
      user,
      node:{
        version: node,
        npm: npm
      }
    }
    return infoPlayer
  } catch (error) {
    console.log(`[ INFO PLAYER - error obteniendo la info del player - ${error}]`);
  }
}

function serial(){
    const networks = os.networkInterfaces()
    const { mac } = networks.hasOwnProperty('wlan0') ? networks.wlan0[0] : networks.eth0[1]
    const serial = mac.replace(/:/g, '');
    return serial.slice(-6)
}

function signalWifi(){
  exec('iwconfig', (error, stdout, stderr) => {
    if (error) {
      console.error(`error: ${error.message}`);
      return;
    }else{
      const signalLevel = stdout.slice(317, 329)
      console.log(rta);
      let rta = signalLevel.split('=')
      return rta
    }
  });
}

module.exports = {
    status,
    interfaces,
    info,
    serial,
    signalWifi
}