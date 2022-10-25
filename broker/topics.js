const { player } = require('../config')
const { customer } = require('../config')

function buildTopics(){
    return {
        suscriber:{
          players: `${customer.name}/players`, //request global to all players
          player: `${customer.name}/player/${player.serial}`, //request to player
        },
        publish:{
          status: `${customer.name}/player/status/${player.serial}`,
          response: `${customer.name}/player/response/${player.serial}`,
          currentStreaming: `${customer.name}/player/currentstreaming/${player.serial}`
        }
    }
}

module.exports={
  buildTopics,
}
