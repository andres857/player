const moment = require('moment'); // require

function currentDate(){
 return moment( new Date() ).format("DD/MM/YYYY HH:mm:ss")
}

function currentDateForStats(){
    const day = moment( new Date() ).format("DD/MM/YYYY")
    const hour = moment( new Date() ).format("HH:mm:ss")
    return day + "," + hour
   }

module.exports = {
    currentDate,
    currentDateForStats
}