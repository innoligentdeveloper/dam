var express = require('express');
var app = express();
var PORT = 3000;
//ruteo dispositivo
var routerDisp = require('./routes/dispositivo');
//ruteo dispositivo
var routerMedicion = require('./routes/medicion');
var routerLogs = require('./routes/logs');
app.use(express.json());


app.use('/home/api/dispositivo', routerDisp);
app.use('/home/api/medicion', routerMedicion);
app.use('/home/api/logs', routerLogs);

app.use(express.static('/home/node/app/static/'));

app.listen(PORT, function(req, res) {
    console.log("API Funcionando ");
});