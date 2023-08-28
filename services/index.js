import { Device, MediaPlayer } from "../player/index.js";

export default class handleServices{
  constructor(){
     this.device = new Device();
     this.mediaPlayer = new MediaPlayer();
  }

  async handleRequest(payload){
    switch (payload) {
      case 'status':
        return this.device.status();
      case 'restart':
        return this.device.reboot();
      case 'interfaces':
        return this.device.interfaces();
      case 'info':
        return this.device.info();
      case 'nodeversion':
        return this.device.nodeversion();
      case 'serial':
        return this.device.getSerial();
      case 'screenshot':
        return await this.mediaPlayer.screenshot();
      case 'openStreaming':
        return this.mediaPlayer.openStreaming();
      case 'closeStreaming':
        return this.mediaPlayer.closeStreaming();
      case 'muteStreaming':
        return this.mediaPlayer.setVolume(0);
      case 'unMuteStreaming':
        return this.mediaPlayer.setVolume(1);
      default:
        return 'Peticion no Valida'
    }
  }

  async handle(action) {
    let payload = action.request;
    console.log('service',payload);
    return await this.handleRequest( payload );
  }
}