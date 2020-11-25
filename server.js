//const express = require('express');
//const cors = require('cors');
//const morgan = require('morgan');
//const bodyParser = require('body-parser');
const os = require('os-utils');
const server = require('http').createServer();

//config .env to diff location
require('dotenv').config({
    path:'./config/config.env'
})

// const app=express();

// app.use(bodyParser.json())

// //for development

//     app.use(cors({
//         origin : process.env.CLIENT_URL
//     }))
//     app.use(morgan('dev'));
    //morgan : Gives info about each request 
    //cors :It allows to deal with react for localhost at port 3000 


    
    const io = require('socket.io')(server, {
      transports: ['websocket', 'polling']
    });
    
     
    let tick = 0;
// 1. listen for socket connections
    io.on('connection', client => {
      //  console.log(client);
        setInterval(() => {
    // 2. every second, emit a 'cpu' event to user
        os.cpuUsage(cpuPercent => {
        client.emit('cpu', {
        name: tick++,
        value: cpuPercent
      });
    });
  }, 1000);
});



const PORT = process.env.PORT || 5000
server.listen(PORT,()=>{
  console.log(`App listening on port ${PORT}`)
});
// app.listen(PORT,()=>{
//     console.log(`App listening on port ${PORT}`)
// })
