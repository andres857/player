const {launch} = require('./player/mediaplayer')
// const {clientMQTT} = require('./broker/index')
const {subscriber} = require('./broker/subscriber')

async function main(){
    try {
        await subscriber()
        await launch()
    } catch (error) {
        console.log(`Error lanzando el reproductor`);
    } 
}
main()



