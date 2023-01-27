const io = require('socket.io-client');
const player = require('../player/info')
const socket = io('http://104.131.10.75:3004');
const Device = require('../player/info')

const mediaPlayer = new Device()

function handleAction(action) {
  switch (action) {
    case 'interfaces':
      return mediaPlayer.interfaces();
    case 'status':
      return mediaPlayer.status();
    case 'info':
      return mediaPlayer.info();
    case 'nodeversion':
      return mediaPlayer.nodeversion();
    case 'serial':
      return mediaPlayer.getSerial();
    default:
      console.log('No se cumple ningun caso');
  }
}

mediaPlayer.getSerial()
  .then((serial) => {
    socket.on(serial, (action) => {
      handleAction(action)// return a function 
        .then((data) => {
          socket.emit('data', { action, data });
        })
        .catch((e) => console.log(e))
    })
  }).catch((e) => console.log(e))