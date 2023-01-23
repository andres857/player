const si = require('systeminformation')
const os = require('os')

const PlayerController = require('media-player-controller');
 
class Mediaplayer extends PlayerController{
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

    async getInterfaces(){
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
      
    async getSerial(){
        const {serial} = await si.system()
        return serial.substring(serial.length -8)
    }
}

let player = new Mediaplayer({
    app: 'vlc',
    args: ['--fullscreen'],
    media: 'http://192.168.1.201/winbox-local.m3u8'
  })
   
  player.on('playback', console.log);
   
  player.on('playback-started', () => {
    console.log('Playback started. Player can now be controlled');
  });
   
  player.on('app-exit', (code) => {
    console.log(`Media player closed. Exit code: ${code}`);
  });
   
  player.launch(err => {
    if(err) return console.error(err.message);
    console.log('Media player launched');
  });

async function main(){
    let c = await player.status()
    let interfaces = await player.getInterfaces()
    let serial = await  player.getSerial()
    console.log(c);
    console.log(interfaces);
    console.log(serial);
}

main()