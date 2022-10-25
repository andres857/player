const mqtt = require('mqtt')
const { connection_broker } = require('../config')
const { player } = require('../config')

const clientMQTT  = mqtt.connect(`mqtt://${connection_broker.serverBroker}`,{
  clientId: player.serial,
  port: connection_broker.portBroker,
  username: connection_broker.usernameBroker,
  password: connection_broker.passwordBroker,
  keepalive:60,
  clean:true,
  reconnectPeriod: 10000,
  connectTimeout:4000,
  resubscribeOnReconnect: true
})

clientMQTT.on('connect', function () {
    console.log(`[ BROKER - Player connection successfull to broker ]`);
})

module.exports = clientMQTT


