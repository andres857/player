import { channels } from "./config.js"

export default {
  // channel by default
  institutional : {
    url: channels.institucional,
    name: 'Windows Channel TV',
    volume:{
      active:false,
      level:''
    }
  },
  commercial : {
    url: channels.comercial,
    name: "Caracol", 
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
      time_pos:'',
      previous_time_pos:'',
      count_closed_mediaplayer : 0,
      streaming_stop: 0,
      openplayer: false,
      limits:{
        wait_time: 60000 , // time in ms
        streaming_stop: 3 ,
        closed_mediaplayer: 3
      }
    }
  } 
}