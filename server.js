var express = require('express');           // call express
var app     = express();                    // define our app using express
var flights = require('./db/Flights_Full.json');
var port    = process.env.PORT || 8080;     // set our port
var _       = require("underscore");
var cors    = require('cors');
    app.use(cors());


var router = express.Router();              // get an instance of the express Router

router.use(function(req, res, next) {       // middleware to use for all requests
    console.log('Something is happening.');
    next();                                 // make sure we go to the next routes and don't stop here
});

router.get('/:carrier_code', function(req, res) {     //(accessed at GET http://localhost:8080/flight_subscription)
    var flights2 = _.filter(flights, function(flight){ return flight.carrier_code === req.params.carrier_code; });
    if(flights2.length > 0) {
        res.json(flights2);
    }else{
        res.send('page not found', 404);
    }
});

router.get('', function(req, res) {
    res.json(flights);
});

app.use('/flight_subscriptions', router);    // all of our routes will be prefixed with /api

app.get('*', function(req, res){
    res.send('Page not Found', 404);
});


app.listen(port);                       // START THE SERVER
    console.log('Magic happens on port ' + port);