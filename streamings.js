require('dotenv').config({ path: '/home/pi/player/.env'})

streamings = {
  // channel by default
  institutional : {
    url: process.env.URL_STREAMING_INSTITUCIONAL,
    name: 'Windows Channel TV',
  },
  commercial : {
    url: process.env.URL_STREAMING_COMERCIAL,
    name: "Caracol" // Canal comercial por defecto
  },
  current :{
    url:'',
    name:''
  } 
}

module.exports = streamings
