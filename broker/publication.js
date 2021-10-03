const {clientMQTT} = require('./index')

function response(topic,message){
    clientMQTT.publish(topic, message)
}

module.exports = {
    response
}