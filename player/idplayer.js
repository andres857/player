const si = require('systeminformation')
const {status} = require('./system')
const clientMQTT = require('../broker/index')

async function serialPlayer(){
    let {serial} = await si.osInfo()
    return serial.slice(0,6)
}

async function publishStatusPlayer(){
    const statusPlayer = await status()
    const id = await serialPlayer()
    clientMQTT.publish(`player/status/${id}`, JSON.stringify(statusPlayer),()=>{
      console.log(`mensaje publicado en topic player/status/${id}`);
    })
}
// se ejecuta cada hora 21600000
setInterval(async() => {
    await publishStatusPlayer()
  }, 21600000);

module.exports = {
    serialPlayer,
    publishStatusPlayer
}