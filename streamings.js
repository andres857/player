require('dotenv').config({ path: '~/player/.env'})
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
    broadcast: false,
    message:'',
    url:'',
    name:'',
    volume:{
      active:false,
      level:''
    },
    monitor:{
      playerClosed: 0,
      time_pos:'',
      previous_time_pos: 0
    }
  } 
}

module.exports = streamings
