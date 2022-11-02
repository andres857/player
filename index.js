const { connectBroker } = require('./broker/')
const { doSubscriber, receiverMessages } = require('./broker/subscriber')
const {doPublish} = require('./broker/publish')
const { buildTopics } = require('./broker/topics')

async function main(){
    const {suscriber} = await buildTopics()
    const client = await connectBroker()
    
    doSubscriber(client,suscriber).then((client)=>{
        receiverMessages(client, suscriber).then(()=>{
            console.log('[ PLAYER - ready for receiver messages from broker ]');
            doPublish(client).then(()=> console.log('publish success'))
        })
    }).catch((e)=>{
        console.log(e);
    })
}

main()