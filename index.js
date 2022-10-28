const { connectBroker } = require('./broker/')
const { doSubscriber, receiverMessages } = require('./broker/subscriber')
const { buildTopics } = require('./broker/topics')

async function main(){
    const {suscriber} = await buildTopics()
    const client = await connectBroker()
    
    doSubscriber(client,suscriber).then((client)=>{
        console.log('enter in promise');
        receiverMessages(client).then(()=>{
            console.log('Enter promise receiver messages');
        })
    }).catch((e)=>{
        console.log(e);
    })
}

main()