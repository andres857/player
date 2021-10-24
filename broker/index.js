require('dotenv').config({ path: '~/player/.env'})
const mqtt = require('mqtt')

const serverBroker = process.env.SERVERBROKER
const portBroker = process.env.PORTBROKER

const clientMQTT  = mqtt.connect(`mqtt://${serverBroker}`,{
  port: portBroker,
  username:'emqx1',
  password: 'public',
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


