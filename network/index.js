const io = require('socket.io-client');
const player = require('../player/info')
// Conectarse al servidor de Socket.io
const socket = io('http://104.131.10.75:3003');
const Device = require('../player/info')
// Escuchar eventos personalizados del servidor

const mediaPlayer = new Device()

function getStatusDevice(){
  mediaPlayer.status().then((status)=>{
    socket.emit('status', status)
  }).catch(e => console.log(e))
}

function getInteraces(){
  mediaPlayer.interfaces().then((interfaces)=>{
    socket.emit('interfaces', interfaces)
  }).catch(e => console.log(e))
}

function getSerial(){
  mediaPlayer.getSerial().then((serial)=>{
    socket.emit('serial', serial)
    console.log(serial);
  }).catch(e => {
    console.log(e);
  })  
}

function getInfoDevice(){
  mediaPlayer.info().then((data)=>{
    socket.emit('info', data)
  }).catch(e => console.log(e))
}

function getNodeVersion() {
  mediaPlayer.nodeversion().then((data)=>{
    socket.emit('nodeversion', data)
  }).catch(e => console.log(e));
}

mediaPlayer.getSerial().then((serial)=>{
  socket.on(serial, (action)=>{
    switch (action) {
      case 'interfaces':
        getInteraces()
        break;
      case 'status':
        getStatusDevice()
         break;
      case 'info':
        getInfoDevice()
          break;
      case 'nodeversion':
        getNodeVersion()
          break;
      case 'serial':
        getSerial()
          break;
      default:
        console.log('No se cumple ningun caso');
        break;
    }
  })
})