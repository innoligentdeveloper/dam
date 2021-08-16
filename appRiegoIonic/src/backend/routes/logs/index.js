var express = require('express');
var routerLogs = express.Router();
var pool = require('../../mysql');

//Espera recibir por parámetro un id de electrovalvula y devuelve todos sus logs
routerLogs.get('/:idElectrov/todas', function(req, res) {
    pool.query('Select * from Log_Riegos where electrovalvulaId=? order by fecha desc', [req.params.idElectrov], function(err, result, fields) {
        if (err) {
            res.send(err).status(400);
            return;
        }
        res.send(result);
    });
});
routerLogs.post('/insert', function(req, res) {
    pool.query('insert into Log_Riegos(apertura, fecha, electrovalvulaId) values( ?, ?, ?)', [req.body.apertura, new Date(), req.body.electrovalvulaId], function(err, result, fields) {
        if (err) {
            res.send(err).status(400);
            console.log(err);
            return;
        }
        res.send(result);
        console.log(result);
    });
});

module.exports = routerLogs;