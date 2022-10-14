require('dotenv').config({ path: '/home/pi/player/.env'})

streamings = {
  // channel by default
  institutional : {
    url: process.env.URL_STREAMING_INSTITUCIONAL,
    name: 'Windows Channel TV',
    volume:{
      active:false,
      level:''
    }
  },
  commercial : {
    url: process.env.URL_STREAMING_COMERCIAL,
    name: "Caracol", // Canal comercial por defecto,
    volume:{
      active:false,
      level:''
    }
  },
  current :{
    url:'',
    name:'',
    volume:{
      active:false,
      level:''
    }
  } 
}

module.exports = streamings
