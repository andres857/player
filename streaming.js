require('dotenv').config()

streaming = {
    wchannel : {
      url: process.env.URL_STREAMING_INSTITUCIONAL,
      channel: 'Windows Channel TV'
    },
    comercial : {
      url: process.env.URL_STREAMING_COMERCIAL,
      channel: "Caracol" // Canal comercial por defecto
    },
    currentChannel :{
      url:'',
      channel:''
    } 
  }

function getCurrentStreaming(streaming){
  return streaming
}

module.exports = {
    streaming,
    getCurrentStreaming,    
}
