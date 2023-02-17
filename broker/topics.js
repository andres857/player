const { customer } = require('../config')

async function buildTopics(serial){
  return {
    suscriber:{
      players: `${customer.name}/players`, //request global to all players
      player: `${customer.name}/player/${serial}`, //request to player
    },
    publish:{
      response: `${customer.name}/player/response/${serial}`,
    }
  }
}

module.exports={
  buildTopics,
}
