function evaluate1(text){
    const channels = {
        'name': 'windowschannel',
        'lastname': 'windows',
        'url': 'windowschannel.com',
        'zona': 'myzonego.com',
    }
    return channels[text] ?? 'NA';
}

function evaluate(action){
    options = {
        restart: function(){
            // shutdown(function(output){
            //     console.log(` Reiniciando player topic global - ${currentDate()} `);
            //     console.log(output);
            // });
            console.log('Simulando reinicio del dispositivo');
        },
        status: function(){
            console.log('Simulando publiacion en el broker');
            // await doPublishStatusPlayer(client)
        },
        streaming: function(){
            console.log('Simulando cambio de streaming');
        },
        nothing: function(){
            console.log('Nada para hacer');
        }
    }
    const execute = options[action] ??  options['nothing'];
    execute()
}

const rta = evaluate('restart')

if( message.restart === 'device' ){
    shutdown(function(output){
        console.log(` Reiniciando player topic global - ${currentDate()} `);
        console.log(output);
    });
}else if(message.status === 'device'){
    await doPublishStatusPlayer(client)
}else if(message.streaming.name !== "" && message.streaming.url !== ""){
    newStreaming( message.streaming.name, message.streaming.url )
}else{
    console.log('peticiones no valida')
} 


// -----------------------global if
if( message.restart === 'device' ){
    shutdown(function(output){
        console.log(` Reiniciando player topic global - ${currentDate()} `);
        console.log(output);
});
}else if(message.streaming.name !== "" && message.streaming.url !== ""){
    newStreaming( message.streaming.name, message.streaming.url )
}else{
    console.log('peticiones no valida')
}



