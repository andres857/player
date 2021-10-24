const si = require('systeminformation')
const {status} = require('./system')
const clientMQTT = require('../broker/index')

async function serialPlayer(){
    let {serial} = await si.osInfo()
    return serial.slice(0,6)
}
// se ejecuta cada hora 21600000
setInterval(async() => {
    const statusPlayer = await status()
    const id = await serialPlayer()
    clientMQTT.publish(`player/status/${id}`, JSON.stringify(statusPlayer),()=>{
      console.log(`mensaje publicado en topic player/status/${id}`);
    })
  }, 10000);

module.exports = serialPlayer
