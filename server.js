var express = require('express');           // call express
var app     = express();                    // define our app using express
var flights = require('./db/Flights_Full.json');
var port    = process.env.PORT || 8080;     // set our port
var _       = require("underscore");
var cors    = require('cors');

app.use(cors());

app.get('/carriers', function(req, res) {
    var carriersSort = [];
    for (var i=0; i<flights.length; i++){
        var carriersAll = _.omit(flights[i], 'carrier_id', 'id', 'flight_number_start', 'flight_number_end', 'operational_suffix');
        carriersSort.push(carriersAll)
    }
    res.json(carriersSort);
});

app.get('/flight_subscriptions/:carrier_code', function(req, res) {
    var flights2 = _.where(flights, {carrier_code: req.params.carrier_code});
        res.json(flights2)
});

app.get('*', function(req, res){
    res.send('Page not Found\n', 404);
});

app.listen(port);                       // START THE SERVER
console.log('Magic happens on port ' + port);
