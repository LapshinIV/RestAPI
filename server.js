var express = require('express');           // call express
var app     = express();                    // define our app using express
var flights = require('./db/Flights_Full.json');
var port    = process.env.PORT || 8080;     // set our port
var _       = require("underscore");
var cors    = require('cors');

app.use(cors());

app.get('/carriers', function(req, res) {
    res.send('Not supported yet. Coming soon...\n');
});

app.get('/flight_subscriptions/:carrier_code', function(req, res) {
    var flights2 = _.filter(flights, function(flight){ return flight.carrier_code === req.params.carrier_code; });
    if(flights2.length > 0) {
        res.json(flights2);
    }else{
        res.send('Page not Found\n', 404);
    }
});

app.get('*', function(req, res){
    res.send('Page not Found\n', 404);
});

app.listen(port);                       // START THE SERVER
console.log('Magic happens on port ' + port);
