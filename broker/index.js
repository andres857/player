const mqtt = require('mqtt')
const clientMQTT  = mqtt.connect('mqtt://brokerwc.windowschannel.com')
const player = require('../player/mediaplayer')

module.exports = clientMQTT.on('connect', function () {
    console.log(`[ BROKER - Player connection successfull to broker ]`);
  })

// module.exports = {
//     clientMQTT
// }

