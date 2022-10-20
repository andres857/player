const { serial } = require('../player/info')
const { customer } = require('../config')

function buildTopics(){
    let id = serial()
    return {
        suscriber:{
          players: `${customer.name}/players`, //request global to all players
          player: `${customer.name}/player/${id}`, //request to player
        },
        publish:{
          status: `${customer.name}/player/status/${id}`,
          response: `${customer.name}/player/response/${id}`,
          currentStreaming: `${customer.name}/player/currentstreaming/${id}`
        }
    }
}

module.exports={
  buildTopics,
}
