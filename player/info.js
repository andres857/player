const si = require('systeminformation')
const os = require('os')
const { exec } = require('child_process');
const { log } = require('console');


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

async function nodeversion(){
  try {
    let { node, npm } = await si.versions()
    return {
      node:node,
      npm: npm
    }
  } catch (error) {
    console.log(`[ INFO PLAYER - error obteniendo la version de node y npm - ${error}]`);
  }
}

async function getSerial(){
  const info = await si.osInfo()
  const serial = info.serial
  return serial.substring(serial.length -8)
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
    nodeversion,
    getSerial,
    signalWifi
}

