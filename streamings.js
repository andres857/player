require('dotenv').config({ path: '~/player/.env'})
streamings = {
  // channel by default
  institutional : {
    inbroadcast: false,
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
    inbroadcast: false,
    url:'',
    name:'',
    volume:{
      active:false,
      level:''
    }
  } 
}

module.exports = streamings
