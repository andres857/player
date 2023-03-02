const {newStreaming,launch} =require('../player/mediaplayer')
const {current} = require('../streamings')
const Device = require('../player/info');

class handleServices{
  constructor(){
     this.mediaPlayer = new Device()
  }

  newStreamingReceived(name, url, volumen, duration){
    if (!current.monitor.openplayer){
        launch(name,url,volumen,duration)
    }else{
        newStreaming(name,url,volumen,duration)
    }
    return `new streaming ${name}`
  }

  handleRequest(payload){
    switch (payload) {
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
        return this.mediaPlayer.reboot();
      case 'screenshot':
        return this.mediaPlayer.screenshot();
      default:
        return 'Nada para hacer'
    }
  }

  async handle(action) {
    if (!action.request.newstreaming){
      let payload = action.request
      return await this.handleRequest(payload)
    }else{
      let {name, url, volumen, duration} = action.request.newstreaming
      return this.newStreamingReceived(name, url, volumen, duration)    
    }
  }
}

module.exports = handleServices


