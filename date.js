const moment = require('moment'); // require

function currentDate(){
 return moment(new Date()).format("DD/MM/YYYY HH:mm:ss")
}

module.exports = currentDate