const {current} = require('../streamings')
const Device = require('../player/info');
const { newStreaming } = require('../player/mediaplayer');

class handleServices{
  constructor(){
     this.mediaPlayer = new Device()
  }

  newstreaming(){
    console.log('nuevo streaming recibido');
    if (!current.monitor.openplayer){
        console.log('[ PLAYER - open player ]');
        launch(message.name,message.url,message.volume)
    }else{
        newStreaming(message.name,message.url,message.volume)
    }
  }

  async handle(action) {
    console.log(action);
    switch (action) {
      case 'interfaces':
        return this.mediaPlayer.interfaces();
      case 'status':
        return this.mediaPlayer.status();
      case 'info':
        return this.mediaPlayer.info();
      case 'nodeversion':
        return this.mediaPlayer.nodeversion();
      case 'serial':
        return this.mediaPlayer.getSerial();
      case 'restart':
        return this.mediaPlayer.reboot()
      case 'newStreaming':
          return this.newstreaming()    
      default:
        console.log('HANDLE REQUEST - NOTHING FOR DO');
        return 'Nada para hacer'
    }
  }
}

module.exports = handleServices


