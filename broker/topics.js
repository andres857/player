require('dotenv').config({ path: '~/player/.env'})
const {serialPlayer} = require('../player/idplayer')

const client = process.env.CLIENT

function buildTopics(){
    let id = serialPlayer()
    return {
        suscriber:{
          players: `${client}/players`, //request global to all players
          player: `${client}/player/${id}`, //request to player
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
