require('dotenv').config({ path: '~/player/.env'})
const {serialPlayer} = require('../player/idplayer')

const client = process.env.CLIENT

function buildTopics(){
    let id = serialPlayer()
    return {
        suscriber:{
          newStreaming:`${client}/player/streaming`, // Topic change the channel for all players, topic general
          newStreamingPlayer:`${client}/player/streaming/${id}`,//Change the streaming only this player
          restart:`${client}/player/restart`,
          request:`${client}/player/request/${id}`,
        },
        publish:{
          status: `${client}/player/status/${id}`,
          response: `${client}/player/response/${id}`,
          currentStreaming: `${client}/player/currentstreaming/${id}`
        }
    }
}

module.exports={
  buildTopics,
}
