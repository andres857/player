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
    local :{
      url:'/home/pi/Downloads/HIDDEN_261_29184_VIDEO_wch_la_curva_del_olvido_v1.mp4',
      channel:'local'
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
