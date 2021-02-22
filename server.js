const express = require('express');
const app = express();
let router = express.Router();
const cors = require('cors');
const bodyParser = require('body-parser');
const api = require('./routes/api');

//cross origin config
const originsWhitelist = [
    'http://localhost:3000',    //local
    'http://localhost:3001',    //local
];
const corsOptions = {
    origin: function(origin, callback){
        var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
        callback(null, isWhitelisted);
    },
    credentials:true
}

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use(cors(corsOptions));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const server = app.listen(8083, function () {
    const port = server.address().port;
    console.log("Workiz node.js is running on port ", port)
});

server.on('error', (e) => {
    if (e.code === 'EADDRINUSE') {
        console.log('Address in use, retrying...');
    }
    console.log(e)
});

app.use('/api', api);

module.exports = app;
