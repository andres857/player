const si = require('systeminformation')

async function serial(){
    const {os} = await si.uuid()
    return os.slice(0,8)
}

module.exports = {serial}
